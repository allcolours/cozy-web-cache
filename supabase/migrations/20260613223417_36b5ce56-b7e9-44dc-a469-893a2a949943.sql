CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  normalized_email text;
  existing_token text;
  new_token text;
BEGIN
  IF queue_name = 'transactional_emails'
     AND NOT (payload ? 'unsubscribe_token')
     AND payload ? 'to'
     AND position('@' in (payload->>'to')) > 1 THEN
    normalized_email := lower(payload->>'to');

    SELECT token INTO existing_token
    FROM public.email_unsubscribe_tokens
    WHERE email = normalized_email
      AND used_at IS NULL
    LIMIT 1;

    IF existing_token IS NULL THEN
      new_token := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');

      INSERT INTO public.email_unsubscribe_tokens (token, email)
      VALUES (new_token, normalized_email)
      ON CONFLICT (email) DO NOTHING;

      SELECT token INTO existing_token
      FROM public.email_unsubscribe_tokens
      WHERE email = normalized_email
        AND used_at IS NULL
      LIMIT 1;
    END IF;

    IF existing_token IS NOT NULL THEN
      payload := payload || jsonb_build_object('unsubscribe_token', existing_token);
    END IF;
  END IF;

  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;