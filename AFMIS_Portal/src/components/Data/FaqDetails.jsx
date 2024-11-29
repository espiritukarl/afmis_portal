export const faqDetails = [
  {
    question: "What does AFMIS mean?",
    answer: <></>,
  },
  {
    question: "What is the purpose of the AFMIS Portal?",
    answer: <></>,
  },
  {
    question: "What is the Price Monitoring System?",
    answer: <></>,
  },
  {
    question: "What is FFEDIS?",
    answer: (
      <>
        <span style={{ fontWeight: 600 }}>
          Farmers and Fisherfolk Enterprise Development Informaion System
        </span>{" "}
        (FFEDIS) is a web based information system designed to assist the
        goverment in formulating plans and programs on enterprise development
        and to enable the product groups, the private sector, the LGUs, and
        potential donors to respond to the needs of the local and world markets
        and in generating resources for further enterprise development. The
        information system shall contain a list of possible and implemented
        programs and projects, a registry of agricultural and fisheries
        enterprises, and a roster of private companies engaged in these
        enterprises or have expressed interest in participating in the Program,
        and other information that may be identified by the Department.
      </>
    ),
  },
  {
    question: "How do I apply my business for FFEDIS?",
    answer: (
      <>
        You can apply your business to FFEDIS by clicking "Directory" then
        clicking "FFEDIS Registration System". You can also find the web app
        here:{" "}
        <a
          href="https://ffedis.da.gov.ph/"
          target="_blank"
          onClick={(e) => e.stopPropagation()}
        >
          ffedis.da.gov.ph
        </a>
        .
      </>
    ),
  },
];
