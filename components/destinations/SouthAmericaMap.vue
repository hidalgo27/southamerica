<script setup lang="ts">
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_southAmericaLow from "@amcharts/amcharts5-geodata/region/world/southAmericaLow";
import { useRouter } from "vue-router";

const chartDiv = ref<HTMLElement | null>(null);
const router = useRouter();
let root: am5.Root | null = null;

const props = defineProps({
  destinations: {
    type: Array,
    required: true,
  }
});

const countries = ref([] as string[]);
watch(() => props.destinations, (newDestinations) => {
  countries.value = newDestinations.map((destination: any) =>
    destination.nombre.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize('NFC')
  );

  // Asegurar que root no tenga una instancia previa
  if (root) {
    root.dispose();
    root = null;
  }

  if (chartDiv.value && countries.value.length > 0) {
    root = am5.Root.new(chartDiv.value);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_southAmericaLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      showTooltipOn: "click",
      cursorOverStyle: "pointer",
      stroke: am5.color(0xffffff),
      strokeWidth: 1.5,
      tooltipPosition: "fixed",
      interactive: (countryname: string) => countries.value.includes(countryname),
      tooltip: am5.Tooltip.new(root, {
        keepTargetHover: true,
      }),
    });

    polygonSeries.mapPolygons.template.get("tooltip")?.label.set("interactive", true);

    polygonSeries.mapPolygons.template.adapters.add("tooltipHTML", (html, target) => {
      const countryName = target.dataItem?.dataContext.name;
      if (!countryName) return html;

      const destination = props.destinations.find((dest: any) =>
        dest.nombre.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize('NFC') === countryName
      );

      if (destination) {
        return `<div class="w-72 space-y-2 p-2">
                  <img src="${destination.imagen}" alt="${destination.nombre}" class="rounded-md" />  
                  <div class="font-bold tracking-wide ">${destination.nombre}</div>
                  <div class="text-xs overflow-hidden w-full max-h-20"><span class="overflow-hidden">${destination.descripcion || ""}</span></div>
                </div>
                <a href="/destinations/${destination.url}" class="w-72 border-t flex justify-between p-2" style="border-color: currentColor">
                  <span class="text-xs">Discover ${destination.nombre}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>`;
      }
      return html;
    });

    polygonSeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const countryName = target.dataItem?.dataContext.name;

      // Si el polígono está en estado de hover, forzamos el color de hover

      // Color normal según la lógica
      return countries.value.includes(countryName) ? am5.color(0xdae7f1) : am5.color(0xd3d3d3);
    });


    // Aplicar interactividad dinámica usando adapter
    polygonSeries.mapPolygons.template.adapters.add("interactive", (interactive, target) => {
      const countryName = target.dataItem?.dataContext.name;
      return countries.value.includes(countryName);
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x31456b),
    });

    function createButtonContainer(position: "left" | "right") {
      return chart.children.push(
        am5.Container.new(root!, {
          x: position === "left" ? 0 : am5.p100,
          centerX: position === "left" ? 0 : am5.p100,
          y: am5.p50,
          centerY: am5.p50,
          layout: root!.verticalLayout,
          paddingTop: 5,
          paddingRight: 8,
          paddingBottom: 5,
          paddingLeft: 8,
          background: am5.RoundedRectangle.new(root!, {
            fill: am5.color(0xf3f3f3),
            fillOpacity: 0,
          }),
        })
      );
    }

    const leftButtons = createButtonContainer("left");
    const rightButtons = createButtonContainer("right");

    function createCountryButton(countryName: string, container: am5.Container) {
      const button = container.children.push(
        am5.Button.new(root!, {
          paddingTop: 5,
          paddingRight: 10,
          paddingBottom: 5,
          paddingLeft: 10,
          maxWidth: 150,
          centerX: am5.p50,
          width: 130,
          cursorOverStyle: "pointer",
          marginBottom: 5,
          background: am5.RoundedRectangle.new(root!, {
            fill: am5.color(0xffffff),
            fillOpacity: 1,
            cornerRadiusTL: 50,
            cornerRadiusTR: 50,
            cornerRadiusBL: 50,
            cornerRadiusBR: 50,
            stroke: am5.color(0x31456b),
            strokeWidth: 0.3,
          }),
          label: am5.Label.new(root!, {
            text: countryName,
            fontSize: 14,
            textAlign: "center",
            fill: am5.color(0x31456b),
          }),
        })
      );

      button.events.on("pointerover", () => {
        polygonSeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === countryName) {
            polygon.states.applyAnimate("hover");
          }
        });
      });

      button.events.on("pointerout", () => {
        polygonSeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === countryName) {
            polygon.states.applyAnimate("default");
          }
        });
      });

      button.events.on("click", () => {
        router.push(`/destinations/${countryName.toLowerCase()}`);
      });
    }

    if (window.innerWidth >= 768) {
      countries.value.forEach((country, index) => {
        if (index % 2 === 0) {
          createCountryButton(country, leftButtons);
        } else {
          createCountryButton(country, rightButtons);
        }
      });
    }
  }
}, { immediate: true });

// Evento para limpiar memoria al desmontar
onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});
</script>

<template>
  <section class="container my-20">
    <div ref="chartDiv" class="hidden md:block map-container rounded-md w-full h-[70vh]"></div>
    <div class="flex flex-wrap  justify-center items-center text-center my-10 mx-auto gap-2 text-xs md:hidden">
      <NuxtLink v-for="country in countries" class="rounded-full border py-2 px-4 flex flex-wrap"
        :to="'/destinations/' + country.toLowerCase()">
        {{ country }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped></style>
