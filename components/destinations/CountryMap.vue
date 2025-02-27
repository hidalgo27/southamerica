<script lang="ts" setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";

const chartDiv = ref<HTMLElement | null>(null);
const router = useRouter();
let root: am5.Root | null = null;

const props = defineProps({
  regiones: {
    type: Array,
    required: true,
  },
  pais: {
    type: Object,
    required: true,
  }
});

const regions = ref([] as string[]);

watch(() => props.regiones, (newDestinations) => {
  if (newDestinations) {
    regions.value = newDestinations.map((destination: any) =>
      destination.nombre.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize('NFC')
    );
  }

  if (root) {
    root.dispose();
    root = null;
  }
}, { immediate: true });


onMounted(() => {
  if (chartDiv.value) {
    const root = am5.Root.new(chartDiv.value);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      })
    );

    const countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        visible: true,
      })
    );

    countrySeries.mapPolygons.template.setAll({
      showTooltipOn: "click",
      cursorOverStyle: "pointer",
      stroke: am5.color(0xffffff),
      strokeWidth: 1.5,
      tooltipPosition: "fixed",
      tooltip: am5.Tooltip.new(root, {
        keepTargetHover: true,
      }),
    });

    countrySeries.mapPolygons.template.get("tooltip")?.label.set("interactive", true);

    countrySeries.mapPolygons.template.adapters.add("tooltipHTML", (html, target) => {
      const countryName = target.dataItem?.dataContext.name;
      if (!countryName) return html;

      const destination = props.regiones.find((dest: any) =>
        dest.nombre.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize('NFC') === countryName
      );

      if (destination) {
        return `<div class="w-72 space-y-2 p-2">
                  <img src="${destination.imagen}" alt="${destination.nombre}" class="rounded-md" />  
                  <div class="font-bold tracking-wide ">${destination.nombre}</div>
                  <div class="text-xs overflow-hidden w-full max-h-20"><span class="overflow-hidden">${destination.descripcion || ""}</span></div>
                </div>
                <a href="/destinations/${props.pais.url}/${destination.url}" class="w-72 border-t flex justify-between p-2" style="border-color: currentColor">
                  <span class="text-xs">Discover ${destination.nombre}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>`;
      }
      return html;
    });

    countrySeries.mapPolygons.template.adapters.add("fill", (fill, target) => {
      const countryName = target.dataItem?.dataContext.name;

      return regions.value.includes(countryName) ? am5.color(0xdae7f1) : am5.color(0xd3d3d3);
    });

    // Aplicar interactividad dinámica usando adapter
    countrySeries.mapPolygons.template.adapters.add("interactive", (interactive, target) => {
      const countryName = target.dataItem?.dataContext.name;
      return regions.value.includes(countryName);
    });

    countrySeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x31456b),
    });

    let countryData = am5geodata_data_countries2[props.pais.codigo];

    if (countryData && countryData.maps.length) {
      let map = countryData.maps[0];
      am5.net.load(`https://cdn.amcharts.com/lib/5/geodata/json/${map}.json`, chart)
        .then((result) => {
          let geoJSON = am5.JSONParser.parse(result.response);
          countrySeries.setAll({
            geoJSON: geoJSON,
            fill: am5.color(0xdae7f1),
          });
        })
        .catch((error) => console.error("Error al cargar el mapa:", error));
    } else {
      console.error("No se encontró el mapa para Perú.");
    }

    // Contenedor de botones a la izquierda
    const leftButtons = chart.children.push(
      am5.Container.new(root, {
        x: 0,
        centerX: 0,
        y: am5.p50,
        centerY: am5.p50,
        layout: root.verticalLayout,
        paddingTop: 5,
        paddingRight: 8,
        paddingBottom: 5,
        paddingLeft: 8,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xf3f3f3),
          fillOpacity: 0,
        }),
      })
    );

    // Contenedor de botones a la derecha
    const rightButtons = chart.children.push(
      am5.Container.new(root, {
        x: am5.p100,
        centerX: am5.p100,
        y: am5.p50,
        centerY: am5.p50,
        layout: root.verticalLayout,
        paddingTop: 5,
        paddingRight: 8,
        paddingBottom: 5,
        paddingLeft: 8,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0,
        }),
      })
    );

    function createRegionButton(regionName, container) {
      const destination = props.regiones.find(dest =>
        dest.nombre.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize('NFC') === regionName
      );
      const button = container.children.push(
        am5.Button.new(root, {
          paddingTop: 5,
          paddingRight: 10,
          paddingBottom: 5,
          paddingLeft: 10,
          maxWidth: 150,
          centerX: am5.p50,
          width: 130,
          marginBottom: 5,
          cursorOverStyle: "pointer",
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
            text: regionName,
            fontSize: 14,
            textAlign: "center",
            fill: am5.color(0x31456b),
          }),
        })
      );

      button.events.on("pointerover", () => {
        countrySeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === regionName) {
            polygon.states.applyAnimate("hover");
          }
        });
      });

      button.events.on("pointerout", () => {
        countrySeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === regionName) {
            polygon.states.applyAnimate("default");
          }
        });
      });

      button.events.on("click", () => {
        router.push(`/destinations/${props.pais.url}/${destination.url}`);
      });
    }
    // Distribuir los botones en los dos contenedores
    regions.value.forEach((region, index) => {
      if (index % 2 === 0) {
        createRegionButton(region, leftButtons);
      } else {
        createRegionButton(region, rightButtons);
      }
    });
  }
});


</script>
<template>
  <section class="container my-20">
    <div ref="chartDiv" class="hidden md:block map-container rounded-md w-full h-[75vh]"></div>
    <div class="flex flex-wrap  justify-center items-center text-center my-10 mx-auto gap-2 text-xs md:hidden">
      <NuxtLink v-for="region in regions" class="rounded-full border py-2 px-4 flex flex-wrap"
        :to="'/destinations/peru/' + region.toLowerCase().replace(/ /g, '-')">
        {{ region }}
      </NuxtLink>
    </div>
  </section>
</template>
<style></style>