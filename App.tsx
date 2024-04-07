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
				<S.Input onChangeText={text => setText(text)} onSubmitEditing={handleAddTodo} />
				<Button title="button" color="black" onPress={handleAddTodo} />
				{todoArray.map(item => (
					<View key={item.id} style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
						<Text key={item.id}>{item.todo}</Text>
						<Button title="X" onPress={() => handleDeleteTodo(item.id)} />
					</View>
				))}
			</View>
		</SafeAreaView>
	);
}

export default App;
