// 'use client';
// import React from 'react'
// import AboutSection3 from '../components/aboutUs/aboutUs';
// import { Marquee } from '../components/aboutUs/aboutUs2part';

// function page() {
//   return (
//     <div >
//         <div className='py-[4.5rem]'>
//       <AboutSection3/>
//         </div>

//       <Marquee/>
//     </div>
//   )
// }

// export default page










// 'use client';
// import React from 'react'
// import AboutSection3 from '../components/aboutUs/aboutUs';
// import { Marquee } from '../components/aboutUs/aboutUs2part';
// import { TestimonialCarousel } from '../components/aboutUs/testimonial';
// import ScrollReelTestimonials from '../components/aboutUs/aboutUs4aft-testi';
// // import { TestimonialCarousel } from '../components/aboutUs/testimonial';


// function page() {
//   return (
//     <div>
//       <div className='py-[4.5rem]'>
//         <AboutSection3/>
//       </div>
//       <TestimonialCarousel/>
//       <ScrollReelTestimonials/>

//       {/* Marquee ke andar elements daalna zaroori hai takay wo screen par show hon */}
//       <div className="w-full bg-gray-100 py-4 border-y border-gray-200">
//         <Marquee pauseOnHover className="[--duration:20s]">
//           <span className="text-2xl font-bold mx-8 text-neutral-800">🚀 Web Development</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">✨ UI/UX Design</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">📱 Mobile Apps</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">💡 Brand Strategy</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">🔍 SEO Optimization</span>
//         </Marquee>
//       </div>
//     </div>
//   )
// }

// export default page











// 'use client';
// import React from 'react'
// import AboutSection3 from '../components/aboutUs/aboutUs';
// import { Marquee } from '../components/aboutUs/aboutUs2part';
// import { TestimonialCarousel } from '../components/aboutUs/testimonial';
// import ScrollReelTestimonials from '../components/aboutUs/aboutUs4aft-testi';
// import { TestimonialsColumn } from '../components/aboutUs/aboutEnd';
// // import { TestimonialCarousel } from '../components/aboutUs/testimonial';

// const reelTestimonials = [
//   {
//     quote: "Working with this team completely changed our infrastructure game. They delivered beyond our expectations.",
//     author: "Michael Chen",
//     image: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop",
//     alt: "Michael Chen",
//   },
//   {
//     quote: "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions.",
//     author: "Jessica Roberts",
//     image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
//     alt: "Jessica Roberts",
//   },
//   {
//     quote: "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every milestone.",
//     author: "William Carter",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
//     alt: "William Carter",
//   },
// ];

// const columnTestimonials = [
//   {
//     text: "Working with this team completely changed our infrastructure game. They delivered beyond our expectations.",
//     image: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=200&auto=format&fit=crop",
//     name: "Michael Chen",
//     role: "Senior Software Engineer",
//   },
//   {
//     text: "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions.",
//     image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=200&q=80",
//     name: "Jessica Roberts",
//     role: "Lead Data Scientist",
//   },
//   {
//     text: "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every milestone.",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
//     name: "William Carter",
//     role: "VP Product",
//   },
//   {
//     text: "The onboarding flow they designed cut our support tickets in half within the first month.",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
//     name: "Amara Singh",
//     role: "Head of Customer Success",
//   },
//   {
//     text: "Their attention to performance and accessibility set a new bar for every team we've worked with since.",
//     image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&q=80",
//     name: "Daniel Brooks",
//     role: "Frontend Lead",
//   },
//   {
//     text: "We shipped three major features in the time it usually takes us to ship one. Incredible velocity.",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
//     name: "Priya Nair",
//     role: "Engineering Manager",
//   },
//   {
//     text: "Communication was clear at every step, and the final product matched our vision perfectly.",
//     image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
//     name: "Tom Walker",
//     role: "Founder, Brightpath",
//   },
//   {
//     text: "Their QA process caught issues we would have never found ourselves. Rock solid releases every time.",
//     image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
//     name: "Elena Ruiz",
//     role: "QA Lead",
//   },
//   {
//     text: "A genuinely collaborative team that treats your roadmap like their own. Couldn't ask for a better partner.",
//     image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
//     name: "Marcus Lee",
//     role: "Product Director",
//   },
//   {
//     text: "They rebuilt our checkout flow and conversion went up 22% in the first quarter alone.",
//     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
//     name: "Sofia Bianchi",
//     role: "Growth Lead",
//   },
//   {
//     text: "Reliable, fast, and genuinely fun to work with. Everything you want from a dev partner.",
//     image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80",
//     name: "Ahmed Hassan",
//     role: "CTO, Loopline",
//   },
//   {
//     text: "Their design system saved our team months of work and gave us a consistent product overnight.",
//     image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
//     name: "Grace Kim",
//     role: "Design Systems Lead",
//   },
// ];

// // Split into 4 even groups so each column scrolls a different set
// const columnCount = 4;
// const testimonialColumns = Array.from({ length: columnCount }, (_, i) =>
//   columnTestimonials.filter((_, idx) => idx % columnCount === i)
// );

// function page() {
//   return (
//     <div>
//       <div className='py-[4.5rem]'>
//         <AboutSection3/>
//       </div>
//       <TestimonialCarousel/>
//       <div className="flex justify-center">
//         <ScrollReelTestimonials testimonials={reelTestimonials} />
//       </div>

//       <div className="flex justify-center gap-6 max-h-[740px] overflow-hidden px-4">
//         <TestimonialsColumn testimonials={testimonialColumns[0]} duration={15} />
//         <TestimonialsColumn testimonials={testimonialColumns[1]} duration={19} className="hidden md:block" />
//         <TestimonialsColumn testimonials={testimonialColumns[2]} duration={17} className="hidden lg:block" />
//         <TestimonialsColumn testimonials={testimonialColumns[3]} duration={21} className="hidden xl:block" />
//       </div>

//       {/* Marquee ke andar elements daalna zaroori hai takay wo screen par show hon */}
//       <div className="w-full bg-gray-100 py-4 border-y border-gray-200">
//         <Marquee pauseOnHover className="[--duration:20s]">
//           <span className="text-2xl font-bold mx-8 text-neutral-800">🚀 Web Development</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">✨ UI/UX Design</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">📱 Mobile Apps</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">💡 Brand Strategy</span>
//           <span className="text-2xl font-bold mx-8 text-neutral-800">🔍 SEO Optimization</span>
//         </Marquee>
//       </div>
//     </div>
//   )
// }

// export default page














'use client';
import React from 'react'
import Link from 'next/link';
import AboutSection3 from '../components/aboutUs/aboutUs';
import { Marquee } from '../components/aboutUs/aboutUs2part';
import { TestimonialCarousel } from '../components/aboutUs/testimonial';
import ScrollReelTestimonials from '../components/aboutUs/aboutUs4aft-testi';
import { TestimonialsColumn } from '../components/aboutUs/aboutEnd';
import { ChevronRight } from 'lucide-react';
import { SiGithub, SiX, SiYoutube, SiInstagram, SiFacebook } from '@icons-pack/react-simple-icons';
// import { TestimonialCarousel } from '../components/aboutUs/testimonial';

const reelTestimonials = [
  {
    quote: "Working with this team completely changed our infrastructure game. They delivered beyond our expectations.",
    author: "Ali Zohaib",
    image: "/ali-zohaib.png",
  },
  {
    quote: "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions.",
    author: "Ali Husnain",
    image: "/ali-zohaib.png",
  },
  {
    quote: "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every milestone.",
    author: "Saif-ul-Rehman",
    image: "/ali-zohaib.png",
  },
];

const columnTestimonials = [
  {
    text: "Working with this team completely changed our infrastructure game. They delivered beyond our expectations.",
    image: "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=200&auto=format&fit=crop",
    name: "Ahmad",
    // role: "Senior Software Engineer",
  },
  {
    text: "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=200&q=80",
    name: "Jessica Roberts",
    // role: "Lead Data Scientist",
  },
  {
    text: "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every milestone.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    name: "William Carter",
    // role: "VP Product",
  },
  {
    text: "The onboarding flow they designed cut our support tickets in half within the first month.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    name: "Amara Singh",
    // role: "Head of Customer Success",
  },
  {
    text: "Their attention to performance and accessibility set a new bar for every team we've worked with since.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&q=80",
    name: "Daniel Brooks",
    // role: "Frontend Lead",
  },
  {
    text: "We shipped three major features in the time it usually takes us to ship one. Incredible velocity.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    name: "Priya Nair",
    // role: "Engineering Manager",
  },
  {
    text: "Communication was clear at every step, and the final product matched our vision perfectly.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    name: "Tom Walker",
    // role: "Founder, Brightpath",
  },
  {
    text: "Their QA process caught issues we would have never found ourselves. Rock solid releases every time.",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    name: "Elena Ruiz",
    // role: "QA Lead",
  },
  {
    text: "A genuinely collaborative team that treats your roadmap like their own. Couldn't ask for a better partner.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    name: "Marcus Lee",
    // role: "Product Director",
  },
  {
    text: "They rebuilt our checkout flow and conversion went up 22% in the first quarter alone.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    name: "Sofia Bianchi",
    // role: "Growth Lead",
  },
  {
    text: "Reliable, fast, and genuinely fun to work with. Everything you want from a dev partner.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=200&q=80",
    name: "Ahmed Hassan",
    // role: "CTO, Loopline",
  },
  {
    text: "Their design system saved our team months of work and gave us a consistent product overnight.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80",
    name: "Grace Kim",
    // role: "Design Systems Lead",
  },
];

// Split into 4 even groups so each column scrolls a different set
const columnCount = 4;
const testimonialColumns = Array.from({ length: columnCount }, (_, i) =>
  columnTestimonials.filter((_, idx) => idx % columnCount === i)
);

function page() {
  return (
    <div>
      <div className='py-[4.5rem]'>
        <AboutSection3/>
      </div>
      <TestimonialCarousel/>
      <div className="flex py-12 justify-center">
        <ScrollReelTestimonials testimonials={reelTestimonials} />
      </div>

      <div className="text-center py-20 mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          What our users say
        </h2>
        <p className="text-gray-600 text-base md:text-lg font-normal">
          See what our customers have to say about us.
        </p>
      </div>

      <div className="flex justify-center gap-6 max-h-[740px] overflow-hidden px-4">
        <TestimonialsColumn testimonials={testimonialColumns[0]} duration={15} />
        <TestimonialsColumn testimonials={testimonialColumns[1]} duration={19} className="hidden md:block" />
        <TestimonialsColumn testimonials={testimonialColumns[2]} duration={17} className="hidden lg:block" />
        <TestimonialsColumn testimonials={testimonialColumns[3]} duration={21} className="hidden xl:block" />
      </div>

      {/* Marquee ke andar elements daalna zaroori hai takay wo screen par show hon */}
      <div className="w-full bg-gray-100 py-4 border-y border-gray-200">
        <Marquee pauseOnHover className="[--duration:20s]">
          <span className="text-2xl font-bold mx-8 text-neutral-800">🚀 Web Development</span>
          <span className="text-2xl font-bold mx-8 text-neutral-800">✨ UI/UX Design</span>
          <span className="text-2xl font-bold mx-8 text-neutral-800">📱 Mobile Apps</span>
          <span className="text-2xl font-bold mx-8 text-neutral-800">💡 Brand Strategy</span>
          <span className="text-2xl font-bold mx-8 text-neutral-800">🔍 SEO Optimization</span>
        </Marquee>
      </div>

      {/* Let's Connect CTA Section */}
      <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-white">
        {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Ready to start a project together?
        </h2> */}

        <Link
          href="/contactUs"
          className="bg-neutral-900 hover:bg-neutral-950 shadow-lg shadow-neutral-900 border border-neutral-700 flex items-center gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-6 py-3 rounded-lg cursor-pointer font-semibold"
        >
          LET'S CONNECT WITH US <ChevronRight className="w-5 h-5" />
        </Link>

        {/* Social Icons — replace href="#" with your real profile links */}
        <div className="flex items-center gap-4 mt-8">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors hover:scale-105"
          >
            <SiGithub className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="w-11 h-11 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors hover:scale-105"
          >
            <SiX className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors hover:scale-105"
          >
            <SiInstagram className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors hover:scale-105"
          >
            <SiFacebook className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-11 h-11 bg-gray-900 hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors hover:scale-105"
          >
            <SiYoutube className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default page