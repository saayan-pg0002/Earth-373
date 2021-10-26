import { Helmet } from "react-helmet";

interface PageHelmetProps {
  title?: string;
  description?: string;
}

const PageHelmet: React.FC<PageHelmetProps> = ({
  title,
  description = "The companion app for Baytree Centre mentors",
}) => (
  <Helmet>
    <title>{title ? `${title} | ` : ""} Baytree Centre Mentor Portal</title>
    <meta name="description" content={description} />
  </Helmet>
);

export default PageHelmet;
