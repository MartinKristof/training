import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useContactContext } from '../context/ContactContext';
import { Input, Label, ErrorMessage } from '@training/ui';

const contactSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const navigate = useNavigate();
  const { addSubmission } = useContactContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        reset({ name: '', email: '', message: '' });
      }, 3000); // Reset form after 3 seconds
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      addSubmission(data);
    } catch (error) {
      // Handle any submission errors
      setError('root', {
        message: `Failed to send message. Please try again later. ${error instanceof Error ? `: ${error.message}` : ''}`,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

      {isSubmitSuccessful && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
          Thank you for your message! We will get back to you soon.
        </div>
      )}

      {errors.root && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">{errors.root.message}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name" required>
            Name
          </Label>
          <Input id="name" type="text" hasError={!!errors.name} {...register('name')} />
          {errors.name && <ErrorMessage id="name-error">{errors.name.message}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" required>
            Email
          </Label>
          <Input id="email" type="email" hasError={!!errors.email} {...register('email')} />
          {errors.email && <ErrorMessage id="email-error">{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="message" required>
            Message
          </Label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <ErrorMessage id="message-error">{errors.message.message}</ErrorMessage>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};
