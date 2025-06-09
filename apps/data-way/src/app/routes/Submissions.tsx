import { useContactContext } from '../context/ContactContext';

export const Submissions = () => {
  const { submissions } = useContactContext();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Form Submissions</h2>

      {submissions.length === 0 ? (
        <p className="text-gray-600">No submissions yet.</p>
      ) : (
        <div className="space-y-6">
          {submissions.map(submission => (
            <div key={submission.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{submission.name}</h3>
                  <p className="text-gray-600">{submission.email}</p>
                </div>
                <time className="text-sm text-gray-500">{submission.submittedAt.toLocaleString()}</time>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{submission.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
