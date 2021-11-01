import { ExternalLinkItem } from "../components/ExternalLinkItem";
import PageHelmet from "../util/PageHelmet";

const Resources: React.FC<{}> = () => {
  return (
    <main className='resources'>
      <PageHelmet title='Resources' />

      <div className='container'>
        <h1 className='page-title'>Resources</h1>
        <ExternalLinkItem
          content='BayTree Centre Website'
          path='https://www.baytreecentre.org'
        />
        <ExternalLinkItem
          content='Microsoft SharePoint folder'
          path='https://www.baytreecentre.org'
        />
        <ExternalLinkItem
          content='Mentee Information'
          path='https://www.baytreecentre.org'
        />
        <ExternalLinkItem
          content='Questionaire FAQ'
          path='https://www.baytreecentre.org'
        />
        <ExternalLinkItem
          content='Director Contact Info'
          path='https://www.baytreecentre.org'
        />
        <ExternalLinkItem
          content='About the Developer'
          path='https://www.baytreecentre.org'
        />
      </div>
    </main>
  );
};

export default Resources;
