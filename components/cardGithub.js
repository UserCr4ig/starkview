export default function CardGithub(props) {
  return (
    <div>
      <p>{props.name}</p>
      <div className="flex flex-row text-sm">
        <p className="">FORKS: {props.forks}</p>
        <p className="ml-2">WATCHERS: {props.watchers}</p>
        <p className="ml-2">ISSUES: {props.open_issues}</p>
      </div>
    </div>
  );
}
