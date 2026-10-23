<script lang="ts">
  import SectionPage from "$lib/components/SectionPage.svelte";

  const details = [
    {
      heading: "Plan around demand",
      text: "Landing aims to help therapists anticipate demand and set appointment availability around the needs of their practice.",
    },
    {
      heading: "Book online",
      text: "Patients should be able to find and arrange online sessions with clear information about what comes next.",
    },
    {
      heading: "Stay coordinated",
      text: "AI agents are intended to help with reminders and follow ups, making the coordination around care easier to manage.",
    },
  ];
</script>

<SectionPage
  label="Schedule"
  title="Make more room for care."
  intro="We’re building scheduling tools to help therapists plan availability around practice demand and give patients a straightforward way to book online sessions."
  sectionTitle="What we’re working toward"
  {details}
/>
