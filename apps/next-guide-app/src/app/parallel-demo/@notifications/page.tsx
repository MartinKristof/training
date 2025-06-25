export default function NotificationsSlot() {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>
      <ul className="list-disc pl-5">
        <li>Notification 1: You have a new message.</li>
        <li>Notification 2: Your build completed successfully.</li>
        <li>Notification 3: New comment on your post.</li>
      </ul>
    </div>
  );
}
