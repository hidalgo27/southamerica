<script lang="ts" setup>
import PropertyDestination from '~/components/destinations/PropertyDestination.vue';
import HeaderImgNav from '~/components/page/HeaderImgNav.vue';
import CountryMap from '~/components/destinations/CountryMap.vue';
import EspecialistLetter from '~/components/home/EspecialistLetter.vue';
import MiniReviews from '~/components/home/MiniReviews.vue';
import Newsletter from '~/components/home/Newsletter.vue';
import TextDescription from '~/components/home/TextDescription.vue';
import TravelStories from '~/components/home/TravelStories.vue';
import SliderPackages from '~/components/travel-packages/SliderPackages.vue';
import ListExperiences from '~/components/experiences/ListExperiences.vue';

import { useDestinationStore } from '~/stores/destination';

const destinationStore = useDestinationStore();

const route = useRoute();

const destination = ref(null);
const textDescription1 = ref(null);
const textDescription2 = ref(null);
const header = ref({
  miniTitle: '',
  title: '',
  subTitle: '',
  url: '',
})

const getDestination = async () => {
  const res: any = await destinationStore.getCountry(route.params.country as string)
  destination.value = res.pais;
  if (destination.value) {
    textDescription1.value = {
      minititle: `Trips to ${destination.value.nombre}`,
      title: `Explore ${destination.value.nombre} your way on a tailor-made trip with SouthAmerica`,
      description: destination.value.resumen,
    };

    textDescription2.value = {
      minititle: `Trailor-Made to ${destination.value.nombre}`,
      title: destination.value.titulo,
      description: destination.value.descripcion,
    }
    header.value.miniTitle = destination.value.title;
    header.value.title = destination.value.nombre;
    header.value.subTitle = 'Tours and Vacation Packages';
    header.value.url = destination.value.imagen;
  }
};

onMounted(async () => {
  await getDestination();
});
</script>
<template>
  <HeaderImgNav :header="header"></HeaderImgNav>
  <TextDescription v-if="textDescription1" :textDescription="textDescription1"></TextDescription>
  <CountryMap v-if="destination" :regiones="destination.destinos" :pais="destination"></CountryMap>
  <SliderPackages v-if="destination" :listPackages="destination.paquetes"></SliderPackages>
  <ListExperiences v-if="destination" :items="destination.destinos" :pais="destination"></ListExperiences>
  <TextDescription v-if="textDescription2" :textDescription="textDescription2"></TextDescription>
  <PropertyDestination v-if="destination" :properties="destination.propiedades"></PropertyDestination>
  <EspecialistLetter></EspecialistLetter>
  <!-- <TravelStories></TravelStories> -->
  <Newsletter></Newsletter>
  <MiniReviews></MiniReviews>
</template>
<style></style>