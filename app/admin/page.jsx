'use client';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUsers(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserTable users={users} />
    </div>
  );
}
