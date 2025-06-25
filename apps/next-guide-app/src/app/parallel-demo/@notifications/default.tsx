import React from 'react';

export default function Default() {
  return (
    <div className="bg-slate-100 p-4 rounded-lg text-slate-500 text-sm border border-slate-200">
      <h4 className="font-semibold mb-1 text-slate-700">Default Notification View</h4>
      <p>
        This is the default UI for the notifications slot. It is rendered when no other specific page matches the
        current route within this slot (e.g. on a hard refresh).
      </p>
    </div>
  );
}
