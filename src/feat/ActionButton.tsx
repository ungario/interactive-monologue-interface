import { ChatIcon } from "../comps/ChatIcon";
import { DownloadIcon } from "../comps/DownloadIcon";
import { LinkIcon } from "../comps/LinkIcon";

type ActionButtonProps = {
  action: ActionButton;
  click(value: string, ready: Promise<void>): void;
};
export default function ActionButton(props: ActionButtonProps) {
  const { action, click} = props;

  return (
    <button
      onClick={() => {
        click(action.event.value, Promise.resolve());
      }}
      className="action"
    >
      {action.event.type === "chat" && <ChatIcon className="action-icon" />}
      {action.label}
      {["link", "mail"].includes(action.event.type) && <LinkIcon className="action-icon" />}
      {action.event.type === "download" && <DownloadIcon className="action-icon" />}
    </button>
  );
}
