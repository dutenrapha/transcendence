import { FC } from 'react';
import { Link } from 'react-router-dom';

const About: FC = () => {
  return (
    <div>
      <h1>About</h1>
      <p>Dolor aliquip id laboris id sunt ut mollit nulla sunt tempor anim.</p>
      <p>
        Commodo commodo officia adipisicing Lorem culpa amet magna proident ad ad. Officia mollit
        amet irure quis dolore anim non eu excepteur culpa commodo amet eu. Eiusmod tempor ad
        cupidatat cupidatat occaecat velit et consequat qui ipsum occaecat labore esse. Mollit ad
        amet aliquip proident qui eu proident voluptate fugiat non ad ipsum excepteur.
      </p>
      <Link to='/'>Go to Home</Link>
    </div>
  );
};

export default About;