<script lang="ts" setup>
import SectionsAbout from '~/components/about/SectionsAbout.vue';
import StartPlanningBanner from '~/components/about/StartPlanningBanner.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import Reviews from '~/components/home/Reviews.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';

definePageMeta({
  layout: 'unique-footer'
});

const header = ref({
  miniTitle: 'The SouthAmerica Way',
  title: 'About Us',
  url: 'https://images.goway.com/production/styles/hero_s1_3xl/s3/hero/iStock-892407318_1.jpg?VersionId=6MqcaLqSEubKmLGfclwxia7APNn2A5AH&h=6c3b1055&itok=GtdZmeWC'
})

const sections = [
  {
    title: "Our Story",
    text: "We are a team of travel enthusiasts who love to explore the world and share our experiences with others. Our mission is to help you plan your next adventure and make it a memorable one. Whether you are looking for a relaxing beach vacation or an action-packed adventure, we have you covered. Our team of experts will help you find the perfect destination and create a customized itinerary that suits your needs. So why wait? Start planning your next trip with us today!",
    imgSrc: "https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Queenstown/img_HeritageQueenstown_Exterior.jpg",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Discover Our Story",
    url: "/our-story"
  },
  {
    title: "Why SouthAmerica",
    text: "We know a thing or two about travel at SouthAmerica. Our team of Destination Specialists have been tailoring dream vacations for nearly 55 years. We handle every part of the travel journey, from flights to tours to accommodations. Let us do the hard work so you can sit back, relax, and take in the world. Rely on personalized travel planning, elevated experiences, and legendary customer service.",
    imgSrc: "https://images.goway.com/production/styles/split_image_and_text_image_3xl/s3/split_image_and_text/bridge-crossing-a-body-of-water-at-sunset-in-sydne-2023-12-29-02-41-57-utc.jpeg?VersionId=sMlJcVKbDNWM_FCClfStBq_RQWMkbc9.&h=127ea6d3&itok=2GAvs1Zj",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Learn More",
    url: "/why-southamerica"
  },
  {
    title: "Careers",
    text: "Are you interested in an exciting career? Come work with us! We've spent over 50 years building a rich culture of passionate travel professionals. We accomplish this with values built upon taking care of our people, our customers and the communities in which we operate. We have remote opportunities, as well as in our offices in Toronto, Vancouver, Los Angeles, Manila, and Sydney. ",
    imgSrc: "https://admin.goway.app/content/DataObjects/TRAVERSE/accommodation_images/Heritage_Auckland_Hotel_Wing/img_HeritageAuckland_Exterior.jpg",
    alt: "A group of people enjoying a beach vacation",
    buttonLabel: "Explore Careers",
    url: "/careers"
  }
]
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <section class="bg-primary/10 ">
    <main class="container py-24">
      <h1 class="italic text-4xl mb-6 font-playfair">Our Story</h1>
      <div class="xl:w-2/3 gap-2 leading-relaxed">
        <p>
          The vibrant tapestry of Latin America, with its ancient echoes and breathtaking landscapes, inspired a dream
          in
          the heart of one man, Paul Catano, our director. He visited Cusco, Perú, for a wedding and instantly fell in
          love with the city's stunning beauty and lively energy. Captivated by the chance to share his country's rich
          history with the world, he chose to stay, paving the way for a new journey. In 2013, we broadened our horizons
          by opening our first office in the United States, signaling the start of a journey to connect people around
          the
          globe with the wonders of Latin America, especially of Perú.
        </p>
        <p class="mt-4">
          <b>Gotoperu</b>, motivated by a desire to revolutionize travel in South America, began discreetly with just
          two
          committed individuals. Our objective was clear: to go beyond standard tours and provide personal, immersive
          experiences that would connect travelers with Peru's heart. As our objectives matured, we expanded our reach,
          building on Peru's success and launching <b>Gotolatam</b> in 2019 before expanding into other attractive Latin
          American
          countries. A decisive moment occurred in 2024, when we teamed up with Hidalgo, a prized colleague who shared
          our
          vision, boosting <b>GOTOGROUP's</b> goal to new levels and facilitating expansion into exciting frontiers of
          opportunity.
        </p>
      </div>
    </main>
    <NuxtImg src="https://cdn.vayaadventures.com/wp-content/uploads/Vaya_About-Us-Team-noresize.jpg" class="w-full">
    </NuxtImg>
  </section>
  <section class="">
    <main class="container py-24">
      <h1 class="italic text-4xl mb-6 font-playfair">GOTOGROUP TODAY</h1>
      <div class="xl:w-2/3 gap-2 leading-relaxed">
        <p>
          Today, GOTOGROUP stands as a dynamic network, a collection of specialized companies united by a passion for
          crafting exceptional travel experiences across Latin America. With brands such as <b>Gotoperu, Gotolatam,
            Gotocolombia, Gotoecuador, MachupicchuCompany, and SouthAmerica Company</b>, we provide a diverse array of
          services tailored to meet the needs of every type of traveler—whether you're in search of adventure,
          relaxation, or a luxurious escape.
        </p>
        <p class="mt-4">
          Our unwavering dedication to quality and our deep-rooted passion for the Latin American spirit remain the
          driving forces behind everything we do. With a growing presence that encompasses offices in Peru and the USA,
          along with an upcoming launch in Colombia this year and ambitious plans for Central America, <b>GOTOGROUP</b>
          is
          strategically positioned to continue delivering authentic, high-end travel experiences across the continent.
          We are more than just a travel company; we are a family of passionate individuals collaborating to create
          experiences that connect cultures, enrich lives, and leave lasting memories.
        </p>
      </div>
    </main>
  </section>
  <section class="bg-primary/10 flex flex-col xl:flex-row">
    <main class="container xl:pl-26 xl:pr-24 py-20 order-2 xl:order-1">
      <h1 class="italic text-4xl mb-6 font-playfair">WHAT'S NEXT FOR GOTO?</h1>
      <div class="gap-2 leading-relaxed xl:text-base">
        <p>
          The future at GOTOGROUP is vibrant with possibilities. We are committed to continuous evolution, with exciting
          new destinations and unique experiences constantly being developed. In 2025, we will continue to grow our
          portfolio, adding <b>GotoCostaRica</b> to our list of destinations and expanding our luxury offerings across
          Latin
          America. We're also focused on enhancing our sustainability efforts, ensuring that each journey we create not
          only delights our travelers but also respects the environment.
        </p>
        <p class="mt-4">
          We are committed to earning ISO certifications for quality, environmental sustainability, and safety, making
          sure that every part of our operation meets the highest international standards. Our journey is just
          beginning, and we can't wait to share more of what’s to come.
        </p>
      </div>
    </main>
    <NuxtImg src="https://cdn.vayaadventures.com/wp-content/uploads/Vaya_About-Us-Block-1-noresize.jpg"
      class="h-[40vh] xl:h-full xl:w-1/2 object-cover order-1 xl:order-2">
    </NuxtImg>
  </section>
  <section class="flex flex-col xl:flex-row">
    <NuxtImg src="https://cdn.vayaadventures.com/wp-content/uploads/Vaya_About-Us-Block-2-noresize.jpg"
      class="h-[40vh] xl:h-full xl:w-1/2 object-cover">
    </NuxtImg>
    <main class="container xl: xl:pl-24 py-20">
      <h1 class="italic text-4xl mb-6 font-playfair">GOTO'S ICON</h1>
      <div class="gap-2 leading-relaxed xl:text-base">
        <p>
          At the heart of <b>GOTOGROUP</b> lies our powerful symbol, the <b>Qente</b>. This symbol embodies our deep
          connection
          to
          Andean culture, particularly the legacy of the ancient Incas. The Qente, a mythological and formidable bird,
          represents freedom, knowledge, and protection—essential elements of the philosophy we embrace in our travels.
        </p>
        <p class="mt-4">
          In the Andean worldview, this renowned winged creature safeguards the delicate balance between nature and
          humanity. It also symbolizes our unwavering commitment to authenticity and the creation of unique, meaningful
          journeys for each visitor. The Qente signifies not only the splendor of South American landscapes but also the
          potential to grow, reach new heights, and uncover the unknown. Like this bird, we at <b>GOTOGROUP</b> aspire
          to
          elevate our customers by connecting them with the most breathtaking places in Latin America, from the ancient
          ruins of Machu Picchu to the vibrant landscapes of the Amazon jungle.
        </p>
        <p class="mt-4">
          Our logo is more than just an image; it represents our mission: to serve as guardians of an authentic travel
          experience, preserving traditions and protecting the environment while enabling our clients to uplift their
          spirits and hearts with each excursion. When tourists travel with GOTOGROUP, they do more than merely explore
          a destination; they immerse themselves in a vibrant culture rich with history, nature, and ancient wisdom.
        </p>
      </div>
    </main>
  </section>
  <section class="bg-primary/10 ">
    <main class="container py-24">
      <h1 class="italic text-4xl mb-6 font-playfair">TAILORING YOUR PERFECT ADVENTURE</h1>
      <div class="xl:w-2/3 gap-2 leading-relaxed ">
        <p>
          Every traveler is unique, and so is every journey we create. At GOTOGROUP, we specialize in designing
          personalized travel experiences that reflect your desires, interests, and sense of adventure. Whether you’re
          exploring the ruins of ancient civilizations, hiking through breathtaking landscapes, or indulging in
          luxurious escapes, we work closely with you to craft an itinerary that fits your vision of the perfect
          adventure.
        </p>
        <p class="mt-4">
          From the moment you contact us, our team is dedicated to ensuring your experience exceeds your expectations.
          We take the time to understand what makes your journey special and ensure that every detail is perfectly
          tailored to your needs. With GOTOGROUP, you’ll discover the true spirit of Latin America in a way that’s as
          unique as you are.
        </p>
      </div>
    </main>
  </section>
  <!-- <Newsletter></Newsletter> -->
  <SectionsAbout />
  <Reviews></Reviews>
  <StartPlanningBanner />
</template>
<style></style>