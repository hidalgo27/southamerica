<script lang="ts" setup>
defineProps(
  {
    blog: {
      type: Object,
      required: false,
    },
  }
)

function formatDate(dateString: string | number | Date) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}
</script>
<template>
  <section class="container">
    <div class="mt-24 md:mt-48 w-5/6 justify-center mx-auto">
      <h1 class="font-extrabold text-3xl leading-tight ">
        {{ blog?.titulo }}
      </h1>
      <div class="w-14 border-b-2 border-black mt-1 mb-4">
      </div>
      <p v-if="blog?.user_id" class="text-base italic mb-4">
        By {{ blog.user_id }}
      </p>
      <!-- <p class="italic mb-4">
        Sandeep is a freelance writer from London and loves Jhumpa Lahiri, eating his way through every country he
        visits,
        and terrible puns. He has spent extensive periods of time travelling across Europe and SE Asia, and has also
        lived
        in Central America.
      </p> -->
      <div class="flex flex-wrap justify-between items-center text-sm text-gray-600 mb-6">
        <div class="flex flex-wrap items-center gap-1">
          <span>Published: {{ formatDate(blog?.created_at) || 'N/A' }} |</span>
          <span v-if="blog?.updated_at">Updated: {{ formatDate(blog?.updated_at) || 'N/A' }} |</span>
          <span class="items-center justify-center flex gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            10 min
          </span>
        </div>
        <div>
          <!-- <button aria-label="Share"
            class="inline-flex items-center space-x-1 underline text-black hover:text-gray-700 focus:outline-none">
            <svg aria-hidden="true" class="h-5 w-5" fill="none" focusable="false" stroke="currentColor" stroke-width="2"
              viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8a3 3 0 10-2.83-4H8a3 3 0 100 6h4.17A3 3 0 1015 8zM9 12v6a3 3 0 106 0v-6"
                stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
            <span>
              Share
            </span>
          </button> -->
        </div>
      </div>
    </div>
    <NuxtImg v-if="blog?.imagenes[0]" alt="Japanese food in decorative bowls on wooden table"
      class="w-full h-auto object-cover rounded-md" :src="blog?.imagenes[0].nombre" />
  </section>
</template>
<style></style>