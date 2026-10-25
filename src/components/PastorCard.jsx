export default function PastorCard({ pastor }) {
  const initials = pastor.name
    .split(/\s+/)
    .filter((p) => !/^(pastor|rev\.?|reverend|minister|mrs\.?|mr\.?)$/i.test(p))
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <article className="pastor-card">
      <div className="pastor-photo">
        {pastor.image ? (
          <img
            src={pastor.image}
            alt={`${pastor.name}, ${pastor.role}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="pastor-initials" aria-hidden="true">
            {initials || '+'}
          </span>
        )}
      </div>
      <strong className="pastor-name">{pastor.name}</strong>
      <span className="pastor-role">{pastor.role}</span>
      {pastor.bio && <p className="pastor-bio">{pastor.bio}</p>}
    </article>
  )
}
