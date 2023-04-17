import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { FC, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes';
import './styles/global.css';
import { myTheme } from './styles/mantineTheme';
import { AuthContextProvider } from './context/AuthContext';
import { SocketProvider } from './hooks/socket';

export type FCWithLayout<P = object> = FC<P> & {
  getLayout?: (page: ReactNode) => JSX.Element;
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <SocketProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
            <Notifications />
            <MyRoutes />
          </MantineProvider>
        </SocketProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
