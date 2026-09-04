import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Initial Student Data
const initialStudents = [
  { id: '1', name: 'Maria', role: 'Software Engineer Intern', email: 'maria@example.com', status: 'Active', gpa: '3.8' },
  { id: '2', name: 'AUREX Lead', role: 'Mobile App Developer', email: 'lead@aurex.com', status: 'Active', gpa: '3.9' },
  { id: '3', name: 'Zain Ali', role: 'UI/UX Designer', email: 'zain@example.com', status: 'Inactive', gpa: '3.2' },
  { id: '4', name: 'Amna', role: 'QA Engineer', email: 'amna@example.com', status: 'Active', gpa: '3.6' },
];

// SCREEN 1: Student List Screen
function StudentListScreen({ navigation, students }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search student..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.card} 
            onPress={() => navigation.navigate('StudentDetail', { student: item })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={[styles.badge, item.status === 'Active' ? styles.active : styles.inactive]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.role}>{item.role}</Text>
            <Text style={styles.viewMore}>Tap to view profile ➡️</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

// SCREEN 2: Student Detail Screen
function StudentDetailScreen({ route, navigation }) {
  const { student } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>{student.name}</Text>
        <Text style={styles.detailText}>📧 Email: {student.email}</Text>
        <Text style={styles.detailText}>💼 Role: {student.role}</Text>
        <Text style={styles.detailText}>📊 GPA: {student.gpa}</Text>
        <Text style={styles.detailText}>⚡ Status: {student.status}</Text>
      </View>
      
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅️ Back to List</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// SCREEN 3: Add New Student Screen
function AddStudentScreen({ navigation, setStudents, students }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleAddStudent = () => {
    if (!name || !role) return;
    const newStudent = {
      id: Date.now().toString(),
      name,
      role,
      email: email || 'student@example.com',
      status: 'Active',
      gpa: '3.5',
    };
    setStudents([...students, newStudent]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Add New Student</Text>
        <TextInput style={styles.input} placeholder="Student Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Role / Program" value={role} onChangeText={setRole} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        
        <Pressable style={styles.submitButton} onPress={handleAddStudent}>
          <Text style={styles.buttonText}>Save Student</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// MAIN NAVIGATION APP
export default function App() {
  const [students, setStudents] = useState(initialStudents);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StudentList">
        <Stack.Screen 
          name="StudentList" 
          options={({ navigation }) => ({
            title: 'Student Directory',
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('AddStudent')}>
                <Text style={styles.headerAddBtn}>+ Add</Text>
              </Pressable>
            ),
          })}
        >
          {(props) => <StudentListScreen {...props} students={students} />}
        </Stack.Screen>

        <Stack.Screen 
          name="StudentDetail" 
          options={{ title: 'Student Profile' }}
        >
          {(props) => <StudentDetailScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen 
          name="AddStudent" 
          options={{ title: 'Create Profile' }}
        >
          {(props) => <AddStudentScreen {...props} students={students} setStudents={setStudents} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8', padding: 16 },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e0e0e0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#0066cc' },
  role: { fontSize: 14, color: '#555', marginTop: 4 },
  viewMore: { fontSize: 12, color: '#0066cc', marginTop: 8, fontWeight: '600' },
  badge: { fontSize: 12, fontWeight: 'bold', paddingVertical: 2, paddingHorizontal: 8, borderRadius: 12, overflow: 'hidden' },
  active: { backgroundColor: '#e6f4ea', color: '#137333' },
  inactive: { backgroundColor: '#fce8e6', color: '#c5221f' },
  headerAddBtn: { color: '#0066cc', fontWeight: 'bold', fontSize: 16 },
  detailCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#e0e0e0', marginBottom: 20 },
  detailTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  detailText: { fontSize: 16, color: '#555', marginBottom: 8 },
  backButton: { backgroundColor: '#0066cc', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  form: { backgroundColor: '#fff', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#e0e0e0' },
  formTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 },
  submitButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center' },
});