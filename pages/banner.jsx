import React from 'react';
import Sidebar from './../components/Sidebar';
import PageContainer from '../styles/PageContainer';
import ManageBanner from '../components/ManageBanner';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Banner() {
  return (
    <PageContainer>
      <Sidebar />
      <DndProvider backend={HTML5Backend}>
        <ManageBanner />
      </DndProvider>
    </PageContainer>
  )
}
