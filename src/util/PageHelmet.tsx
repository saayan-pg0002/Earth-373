import { Helmet } from "react-helmet";

interface PageHelmetProps {
  title?: string;
  description?: string;
  isAdminPortal?: string;
}

const PageHelmet: React.FC<PageHelmetProps> = ({
  title,
  description = "The companion app for Baytree Centre mentors",
  isAdminPortal = false
}) => (
  <Helmet>
    {isAdminPortal ? (
      <title>{title ? `${title} | ` : ""} Baytree Centre Admin Portal</title>
    ) : (
      <title>{title ? `${title} | ` : ""} Baytree Centre Mentor Portal</title>
    )}
    <meta name="description" content={description} />
  </Helmet>
);

export default PageHelmet;
