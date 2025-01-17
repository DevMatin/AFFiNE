import { WorkspaceUnit } from '../../workspace-unit.js';
import type { WorkspaceUnitCtorParams } from '../../workspace-unit';
import { createBlocksuiteWorkspace } from '../../utils/index.js';
import { applyLocalUpdates, writeUpdatesToLocal } from './indexeddb/utils.js';
import { setDefaultAvatar } from '../utils.js';

export const loadWorkspaceUnit = async (params: WorkspaceUnitCtorParams) => {
  const workspaceUnit = new WorkspaceUnit(params);

  const blocksuiteWorkspace = createBlocksuiteWorkspace(workspaceUnit.id);

  await applyLocalUpdates(blocksuiteWorkspace);

  workspaceUnit.setBlocksuiteWorkspace(blocksuiteWorkspace);

  return workspaceUnit;
};

export const createWorkspaceUnit = async (params: WorkspaceUnitCtorParams) => {
  const workspaceUnit = new WorkspaceUnit(params);

  const blocksuiteWorkspace = createBlocksuiteWorkspace(workspaceUnit.id);
  blocksuiteWorkspace.meta.setName(workspaceUnit.name);
  if (!workspaceUnit.avatar) {
    await setDefaultAvatar(blocksuiteWorkspace);
    workspaceUnit.update({ avatar: blocksuiteWorkspace.meta.avatar });
  }

  await writeUpdatesToLocal(blocksuiteWorkspace);

  workspaceUnit.setBlocksuiteWorkspace(blocksuiteWorkspace);

  return workspaceUnit;
};
