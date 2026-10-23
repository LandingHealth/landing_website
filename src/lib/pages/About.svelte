<script lang="ts">
  import SectionPage from "$lib/components/SectionPage.svelte";

  const details = [
    {
      heading: "Make the work easier",
      text: "Raj and Akash Patel began with a question: how can a clinician understand a patient’s recovery after they leave the clinic? That question led to SafeSock, and to a broader vision for Landing.",
    },
    {
      heading: "Keep care personal",
      text: "Neil Patel brings gait analysis and sensing experience to the software and signal work. Vivaan Gupta leads hardware development. Together, the team is building tools that support therapists’ judgment and give patients a clearer path through recovery.",
    },
  ];

  const team = [
    { name: "Raj Patel", role: "Co-founder" },
    { name: "Akash Patel", role: "Co-founder" },
    { name: "Neil Patel", role: "CTO" },
    { name: "Vivaan Gupta", role: "Lead Engineer" },
  ];
</script>

<SectionPage
  label="About"
  title="Four students, one shared purpose."
  intro="Landing is being built by four Johns Hopkins students who want to make physical therapy easier to coordinate and more informed by what happens between appointments."
  sectionTitle="Why we’re building Landing"
  {details}
  {team}
/>
