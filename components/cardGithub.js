export default function CardGithub(props) {
  return (
    <div>
      <p>{props.name}</p>
      <div className="flex flex-row">
        <p>{props.forks}</p>
        <p>{props.watchers}</p>
        <p>{props.open_issues}</p>
      </div>
    </div>
  );
}
