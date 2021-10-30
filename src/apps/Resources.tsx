import { ResourceItem } from "../components/ResourceItem";
import PageHelmet from "../util/PageHelmet";

const Resources: React.FC<{}> = () => {
  return (
    <main className='resources'>
      <PageHelmet title='Resources' />

      <div className='container'>
        <h1 className='page-title'>Resources</h1>
        <ResourceItem
          content='BayTree Centre Website'
          path='https://www.baytreecentre.org'
        />
        <ResourceItem
          content='Microsoft SharePoint folder'
          path='https://www.baytreecentre.org'
        />
        <ResourceItem
          content='Mentee Information'
          path='https://www.baytreecentre.org'
        />
        <ResourceItem
          content='Questionaire FAQ'
          path='https://www.baytreecentre.org'
        />
        <ResourceItem
          content='Director Contact Info'
          path='https://www.baytreecentre.org'
        />
        <ResourceItem
          content='About the Developer'
          path='https://www.baytreecentre.org'
        />
      </div>
    </main>
  );
};

export default Resources;
