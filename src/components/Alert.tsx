import Audio from "react-howler";
import alertUrl from "../assets/alert.mp3";

export function Alert({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <dialog open>
      <h1>Alert!</h1>
      <Audio src={alertUrl} playing loop volume={0.5} />
      <button onClick={onDismiss}>Dismiss</button>
    </dialog>
  );
}
