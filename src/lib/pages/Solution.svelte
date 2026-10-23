<script lang="ts">
  import SectionPage from "$lib/components/SectionPage.svelte";

  const details = [
    {
      heading: "Before an appointment",
      text: "As the ecosystem develops, patient check-ins and SafeSock weight-bearing trends can help therapists prepare for the next conversation.",
    },
    {
      heading: "During care planning",
      text: "Landing helps therapists find exercises suited to treatment goals, available equipment, and the restrictions they define.",
    },
    {
      heading: "Between sessions",
      text: "Personalized home exercise guides give patients clear instructions and schedules to reference as they continue their care at home.",
    },
  ];
</script>

<SectionPage
  label="Solution"
  title="Support across the care journey."
  intro="The work of physical therapy continues beyond each appointment. Landing is designed to bring practice planning and patient context into a more connected experience."
  sectionTitle="Before, during, and between"
  {details}
/>
