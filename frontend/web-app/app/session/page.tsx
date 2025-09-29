import {auth} from '@/auth'
import EmptyState from '../components/EmptyState';

export default async function Session() {
    const session = await auth();
  return (
    <div className='container mx-auto py-8'>
        <EmptyState title='Session Dashboard' subtitle='View your session information below'/>
        <div className="mt-6 p-6 bg-white border-2 border-blue-500 rounded-lg shadow-lg">
            <h3 className='text-2xl font-semibold mb-4'>Session Data</h3>
            {session ? (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(session, null, 3)}
                </pre>
            ) : (
                <div className="text-red-500">No active session</div>
            )}
        </div>
    </div>
  )
}
