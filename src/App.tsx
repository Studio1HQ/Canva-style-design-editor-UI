import { useEffect, useState } from 'react';
import { VeltProvider, useVeltClient, VeltComments, VeltCommentsSidebar } from '@veltdev/react';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';
import { LeftSidebar } from './components/LeftSidebar';
import { CanvasStage } from './components/CanvasStage';
import { RightInspector } from './components/RightInspector';
import { LayerList } from './components/LayerList';
import { EditorProvider, useEditor } from './contexts/EditorContext';
import { User } from './types/user';

// Static users configuration - Rick and Morty
const staticUsers: User[] = [
  {
    userId: "user-1",
    name: "Rick Sanchez",
    email: "rick@rickandmorty.com",
    photoUrl: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    organizationId: "org-1",
  },
  {
    userId: "user-2",
    name: "Morty Smith",
    email: "morty@rickandmorty.com",
    photoUrl: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    organizationId: "org-1",
  },
];

interface AppContentProps {
  currentUser: User;
  staticUsers: User[];
  onSwitchUser: (user: User) => void;
}

function AppContent({
  currentUser,
  staticUsers,
  onSwitchUser,
}: AppContentProps) {
  const { client } = useVeltClient();
  const {
    undo,
    redo
  } = useEditor();

  useEffect(() => {
    const initializeVelt = async () => {
      if (client && currentUser) {
        console.log("🔧 Initializing Velt with user:", currentUser);

        try {
          // Identify the user first
          await client.identify(currentUser);
          console.log("✅ User identified successfully");

          // Then set the document for collaboration
          await client.setDocument("collaborative-canvas-2024", {
            documentName: "Canva Clone Collaboration",
          });
          console.log("✅ Document set successfully");
        } catch (error) {
          console.error("❌ Velt initialization error:", error);
        }
      }
    };

    initializeVelt();
  }, [client, currentUser]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Cmd+Z or Ctrl+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Cmd+Shift+Z or Ctrl+Shift+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return <div className="w-full h-screen flex flex-col bg-gray-50">
      <TopBar
        currentUser={currentUser}
        staticUsers={staticUsers}
        onSwitchUser={onSwitchUser}
      />
      <div className="flex-1 flex overflow-hidden relative">
        <LeftSidebar />
        <CanvasStage />
        <RightInspector />
        <LayerList />
      </div>
      <BottomBar />
    </div>;
}

export function App() {
  const apiKey = import.meta.env.VITE_VELT_API_KEY;
  const [currentUser, setCurrentUser] = useState(staticUsers[0]);

  const switchUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("canvas-current-user", user.userId);
  };

  // Load user preference on app start
  useEffect(() => {
    const storedUserId = localStorage.getItem("canvas-current-user");
    const user = storedUserId
      ? staticUsers.find((u) => u.userId === storedUserId) || staticUsers[0]
      : staticUsers[0];
    setCurrentUser(user);
  }, []);

  return (
    <VeltProvider apiKey={apiKey}>
      <VeltComments shadowDom={false} />
      <VeltCommentsSidebar />
      <EditorProvider>
        <AppContent
          currentUser={currentUser}
          staticUsers={staticUsers}
          onSwitchUser={switchUser}
        />
      </EditorProvider>
    </VeltProvider>
  );
}