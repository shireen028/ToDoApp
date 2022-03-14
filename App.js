import {registerScreens} from './app/screens';
import {Navigation} from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
registerScreens();

export default function App() {
  Navigation.setDefaultOptions({
    layout: {
      componentBackgroundColor: '#F2EBDD',
    },
  });
  Navigation.events().registerAppLaunchedListener(async () => {
    Ionicons.loadFont();
    MaterialIcons.loadFont();
    const add = await Ionicons.getImageSourceSync(
      'add-circle-outline',
      25,
      'black',
    );
    const filter = await Ionicons.getImageSourceSync('filter-outline', 25, 'black');
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'ListTodo',
                options: {
                  topBar: {
                    title: {
                      text: 'My Todo List',
                    },
                    rightButtons: [
                      {
                        id: 'filter',
                        icon: filter,
                      },
                      {
                        id: 'addTodo',
                        icon: add,
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    });
  });
}