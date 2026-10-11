const PORTRAIT = '/assets/memoji/center-portrait.png';

export default function InteractiveHead() {
  return <div className="head-tracking head-2d" role="img" aria-label="Memoji da Mari">
    <img className="head-portrait-source" src={PORTRAIT} alt="" aria-hidden="true" />
  </div>;
}
