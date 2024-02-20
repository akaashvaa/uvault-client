export default function Button({ buttonType, action }) {
  return (
    <button
      type={buttonType}
      onClick={action}
      className="rounded-md flex justify-center items-center bg-primary hover:bg-hover  px-3 py-1   "
    >
      <span className="flex items-center "> &#9776;</span>
    </button>
  )
}
