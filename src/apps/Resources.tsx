import { ExternalLinkItem } from "../components/ExternalLinkItem";
import PageHelmet from "../util/PageHelmet";
import { AvatarHeader } from "../components/AvatarHeader";

const Resources: React.FC<{}> = () => {
  return (
    <main className="resources">
      <PageHelmet title="Resources" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Resources</h1>
          <AvatarHeader name="Wendy Evans" />
        </div>
        <div className="resource-list">
          <ExternalLinkItem
            content="Baytree Centre Website"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkItem
            content="Microsoft SharePoint folder"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkItem
            content="Mentee Information"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkItem
            content="Questionaire FAQ"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkItem
            content="Director Contact Info"
            path="https://www.baytreecentre.org"
          />
          <ExternalLinkItem
            content="About the Developer"
            path="https://www.baytreecentre.org"
          />
        </div>
      </div>
    </main>
  );
};

export default Resources;
