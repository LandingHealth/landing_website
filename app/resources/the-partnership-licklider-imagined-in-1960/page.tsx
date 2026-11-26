import Article, { articleMetadata, defineSources } from "@/components/Article";

const slug = "the-partnership-licklider-imagined-in-1960";

export const metadata = articleMetadata(slug);

const sources = defineSources({
  licklider: (
    <>
      Licklider JCR. <a href="https://doi.org/10.1109/THFE2.1960.4503259">Man-Computer Symbiosis</a>. IRE Trans Hum Factors Electron. 1960. The quotes in this article come from the{" "}
      <a href="https://groups.csail.mit.edu/medg/people/psz/Licklider.html">copy of the paper hosted at MIT</a>.
    </>
  ),
  sample: <>Licklider was his own and only subject, and he wrote that he knew the sample was inadequate.</>,
  interim: (
    <>
      An Air Force study group estimated that machines alone would not do much thinking or problem solving of military significance before 1980. Licklider allowed that the interim could last 10 years or 500.
    </>
  ),
});

export default function ThePartnershipLickliderImaginedPage() {
  return (
    <Article slug={slug} sources={sources}>
      <p>
        In March 1960, J.&nbsp;C.&nbsp;R.&nbsp;Licklider published “Man-Computer Symbiosis.”{sources.cite("licklider")} His central argument is that people and computers working together can think and solve problems much more effectively than a person can alone. People bring judgment and flexibility. Computers bring speed and accuracy. Licklider saw value in that partnership even if machines someday learned to do the work on their own. At Landing, we share his belief. In 1960, the partnership was a plan for the future. Today we can build it.
      </p>

      <h2>Licklider gives people the judgment and computers the routine work</h2>
      <p>
        Licklider starts from how people and computers differ. Computers are “very fast and very accurate,” but they do only what their programs foresee. People are slower. They are also “flexible, capable of ‘programming themselves contingently’ on the basis of newly received information.”
      </p>
      <p>
        So Licklider splits the work. People “set the goals, formulate the hypotheses, determine the criteria, and perform the evaluations.” Computers “do the routinizable work that must be done to prepare the way for insights and decisions.”
      </p>
      <p>
        Licklider found that routine work in his own job. In the spring and summer of 1957, he tracked how he spent his working hours. “About 85 per cent of my ‘thinking’ time was spent getting into a position to think, to make a decision, to learn something I needed to know,” he wrote.{sources.cite("sample")} In one case, several hours of calculation put the data from six experiments into a form he could compare. Then it took him a few seconds to see what he needed to know.
      </p>

      <h2>The partnership is worth building even if machines can work alone</h2>
      <p>
        Licklider didn’t claim that computers would stay weaker than people. He thought it “entirely possible” that machines would in time “outdo the human brain in most of the functions we now consider exclusively within its province.”
      </p>
      <p>
        He still argued for the partnership. He expected “a fairly long interim” in which people and computers working together would make the main intellectual advances.{sources.cite("interim")} He wrote that those years “should be intellectually the most creative and exciting in the history of mankind.”
      </p>

      <h2>In 1960 the partnership was a plan for the future</h2>
      <p>
        The paper is a proposal. “At present, however, there are no man-computer symbioses,” Licklider wrote. The equipment it needed was not available, and nobody had written the programs.
      </p>
      <p>
        He listed the hurdles. A large computer was too fast and too costly to serve one person in real time, so it had to divide its time among many users. Most computers offered no better way to communicate than an electric typewriter. He wrote that the gap between human and computer languages “may be the most serious obstacle to true symbiosis.”
      </p>
      <p>
        Speech was further off. Licklider thought real-time work by voice would need a recognizer of about 2,000 words. In 1960, acousticians and linguists agreed that nobody could build one yet.
      </p>

      <h2>Today the tools Licklider needed exist</h2>
      <p>
        Each of those hurdles now has a common answer. Cloud computing shares large computers among many users, much as Licklider proposed. Phones and tablets replace the typewriter with cameras and touch screens. Speech recognition on a phone handles everyday speech.
      </p>
      <p>
        The largest change is in language. Licklider noted that instructions for computers “specify courses,” and instructions for people “specify goals.” Language models now read plain-language notes and act on instructions stated as goals. A computer can now prepare work from the records that people already write.
      </p>

      <h2>Landing splits a PT’s work the way Licklider proposed</h2>
      <p>
        Physical therapy has the same kind of routine work. Before a visit, a PT gathers the patient’s history, earlier session notes, and exercise activity. Between visits, the PT sees little of how the patient moves at home.
      </p>
      <p>
        Landing gives that preparation to the computer. One agent combines the patient’s history, earlier session notes, and exercise activity into a brief for the next visit. For the exercises we support, Landing analyzes each repetition in a patient’s home exercise video and flags the moments that may need attention. In Licklider’s words, these are “the routinizable, clerical operations that fill the intervals between decisions.”
      </p>
      <p>
        The PT keeps the work Licklider gave to people. The PT sets the goals of care, judges what Landing flags, and makes every treatment decision. Licklider also left people the “very-low-probability situations” that no routine covers. In physical therapy, that is the patient whose recovery doesn’t follow the usual course.
      </p>

      <h2>What we’re betting on</h2>
      <p>
        We expect AI to keep improving, and our bet doesn’t depend on it staying weak. Like Licklider, we value the partnership even if computers become able to do more of the work alone. The PT still makes every treatment decision.
      </p>
      <p>
        Our goal is for PTs to spend less time getting into a position to decide and more time with their patients. Licklider could only describe that partnership in 1960. We’re building it for physical therapy.
      </p>
    </Article>
  );
}
