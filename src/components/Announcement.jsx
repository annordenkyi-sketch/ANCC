export default function Announcement({ item }) {
  return (
    <article className="announcement">
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </article>
  )
}
