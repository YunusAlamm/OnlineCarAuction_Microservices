import {auth} from '@/auth'
import EmptyState from '../components/EmptyState';
import AuthTest from './AuthTest';

export default async function Session() {
    const session = await auth();
  return (
    <div className='container mx-auto py-8'>
        <EmptyState title='Session Dashboard' subtitle='View your session information below'/>
        <div className="mt-6 p-6 bg-white border-2 border-blue-500 rounded-lg shadow-lg">
            <h3 className='text-2xl font-semibold mb-4'>Session Data</h3>
            {session ? (
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">User Information</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-gray-600">Username:</div>
                            <div>{session.user.username}</div>
                            <div className="text-gray-600">Email:</div>
                            <div>{session.user.email}</div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">Session Details</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-gray-600">Expires:</div>
                            <div>{new Date(session.expires).toLocaleString()}</div>
                        </div>
                    </div>

                    <details className="mt-4">
                        <summary className="cursor-pointer text-blue-600">View Raw Session Data</summary>
                        <pre className="mt-2 bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                            {JSON.stringify(session, null, 2)}
                        </pre>
                    </details>
                </div>
            ) : (
                <div className="text-red-500">No active session</div>
            )}
        </div>
        <div>
            <AuthTest />
        </div>
    </div>
  )
}
