import alertUrl from "../assets/alert.mp3";

export function Alert({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <dialog open>
      <h1>target percentage observed!</h1>
      <audio autoPlay loop>
        <source src={alertUrl} type="audio/mp3" />
      </audio>
      <button onClick={onDismiss}>Dismiss</button>
    </dialog>
  );
}
