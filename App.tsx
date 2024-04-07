import React, { useState } from "react";
import { Button, SafeAreaView, StatusBar, Text, View, useColorScheme } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

import * as S from "./App.style";

interface TodoType {
	todo: string;
	id: number;
}

function App(): React.JSX.Element {
	const [text, setText] = useState("");
	const [editText, setEditText] = useState("");
	const [editNumber, setEditNumber] = useState(0);
	const [todoArray, setTodoArray] = useState<TodoType[]>([
		{
			todo: "이불개기",
			id: 1,
		},
	]);

	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const handleAddTodo = () => {
		const checkIdValue = todoArray.length ? todoArray[todoArray.length - 1].id + 1 : 1;
		setTodoArray(prev => [...prev, { todo: text, id: checkIdValue }]);
	};

	const handleDeleteTodo = (id: number) => {
		const filteredTodos = todoArray.filter(item => item.id !== id);
		setTodoArray(filteredTodos);
	};

	const handleEditTodo = (id: number) => {
		setEditNumber(id);
	};

	const handleEditDone = (id: number) => {
		setEditNumber(0);
		setTodoArray(prev =>
			prev.map(todo => {
				if (todo.id !== id) return todo;
				return { ...todo, todo: editText };
			}),
		);
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? "light-content" : "dark-content"}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<View
				style={{
					backgroundColor: isDarkMode ? Colors.black : Colors.white,
				}}>
				<S.Input onChangeText={text => setText(text)} onSubmitEditing={handleAddTodo} blurOnSubmit={false} />
				<Button title="button" color="black" onPress={handleAddTodo} />
				{todoArray.map(item => (
					<View key={item.id} style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
						{item.id === editNumber ? (
							<View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
								<S.Input style={{ width: 200, height: 20 }} onChangeText={editText => setEditText(editText)} />
								<Button title="EditDone" onPress={() => handleEditDone(item.id)} />
								<Button title="X" onPress={() => handleDeleteTodo(item.id)} />
							</View>
						) : (
							<View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
								<Text key={item.id}>{item.todo}</Text>
								<Button title="Edit" onPress={() => handleEditTodo(item.id)} />
								<Button title="X" onPress={() => handleDeleteTodo(item.id)} />
							</View>
						)}
					</View>
				))}
			</View>
		</SafeAreaView>
	);
}

export default App;
