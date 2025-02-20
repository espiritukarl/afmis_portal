export const faqDetails = [
  {
    question: "What does AFMIS mean?",
    answer: (
      <>
        <span style={{ fontWeight: 600 }}>
          Agriculture and Fishery Market Information System
        </span>{" "}
        (AFMIS) is a unified agricultural marketing information system that
        would provide timely, accurate, relevant information required by
        agribusiness stakeholders for well-informed business decisions. It is
        also a gateway to other market-related systems. It will feature a single
        user account for other web-based market-related systems.
      </>
    ),
  },
  {
    question: "What is the purpose of the AFMIS Portal?",
    answer: (
      <ul>
        <li>
          Serve as the Market Information dissemination platform of the
          Department
        </li>
        <li>
          Serve as a planning, policy and decision-making tool of the Department
          in providing strategic interventions and solutions whenever there are
          price and supply fluctuations and irregularities.
        </li>
        <li>
          Provide better user experience through simplifying login for AMAS/AMAD
          users handling 2 or more marketing related systems
        </li>
      </ul>
    ),
  },
  {
    question: "What is the Price Monitoring System?",
    answer: (
      <>
        The price monitoring system, also known as{" "}
        <span style={{ fontWeight: 600 }}>Bantay Presyo Monitoring System</span>{" "}
        (BPMS) is a web based system for collection, monitoring and analysis of
        retail price data of agri-fishery commodities at selected markets
        nationwide.
      </>
    ),
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
