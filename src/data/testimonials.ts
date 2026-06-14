export interface Testimonial {
  name: string;
  location: string;
  role: string;
  rating: number;
  quote: string;
  project: string;
}

// Real reviews from our Facebook page:
// https://www.facebook.com/profile.php?id=61561664309105&sk=reviews
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Anna Kinsella",
    location: "Dublin",
    role: "Homeowner",
    rating: 5,
    quote:
      "We hired Ika and his team to paint our house (very old) and couldn't be happier with the results. They were incredibly professional, offering a high standard of work at a very reasonable price. Communication was seamless, making the entire process stress-free. Very tidy and worked through the evening until job was done.",
    project: "Full repaint of a period home",
  },
  {
    name: "Aidan Ford",
    location: "Denmark Street, Dublin 1",
    role: "Café owner",
    rating: 5,
    quote:
      "Great painters, very helpful with design ideas for my coffee shop at Denmark Street, Dublin 1. Great workers, highly recommend.",
    project: "Coffee shop fit-out",
  },
  {
    name: "Jessica Reilly",
    location: "Dublin",
    role: "Homeowner",
    rating: 5,
    quote:
      "I hired Ika and his team to paint an extension of my house for me. They did early starts and were quick, really clean and efficient with zero fuss. They also did any repairs that were required to be done on the walls before painting. The finished job was excellent! I highly recommend Ika and his team for any job.",
    project: "House extension repaint",
  },
  {
    name: "Ed Miliano",
    location: "Dublin",
    role: "Homeowner",
    rating: 5,
    quote:
      "Ika and his team did a great job at our house. They did a beautiful job repairing a leak and painting all our soffits. They also repaired two flat roofs. All the fellows working were very pleasant.",
    project: "Exterior repairs, soffits & flat roofs",
  },
  {
    name: "Marion Walshe",
    location: "Dublin",
    role: "Homeowner",
    rating: 5,
    quote:
      "I used IKA and his team to paint a garden wall and large trellises. IKA and his team are very reliable, work to a very high standard and are reliable and punctual. I will definitely use them again.",
    project: "Garden wall & trellises",
  },
  {
    name: "Gina London",
    location: "Dublin",
    role: "Repeat client",
    rating: 5,
    quote:
      "I have used All Colours for several painting projects in my home, and I can say, without a doubt, that Ika and his team are professionals who provide quality work with attention to detail and customer care. All that and affordable pricing too. Thank you!",
    project: "Multiple repeat projects",
  },
  {
    name: "Joke Otubu",
    location: "Dublin",
    role: "Homeowner",
    rating: 5,
    quote:
      "They are very good and experienced painters. They work diligently. I recommend them any day anytime.",
    project: "Residential painting",
  },
  {
    name: "Trish Duane",
    location: "Dublin",
    role: "Homeowner",
    rating: 5,
    quote:
      "I have highly recommended Ika and his team to friends. Super painting of house exterior and deck removed and replaced.",
    project: "Exterior painting & deck replacement",
  },
];
