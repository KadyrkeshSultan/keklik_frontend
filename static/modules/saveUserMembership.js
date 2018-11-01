"use strict";

import globalBus from "./globalBus";
import debugLog from "./debugLog";

export default function saveUserMembership(member_of_groups) {
    globalBus().saver.userGroups = member_of_groups;
    globalBus().saver.userTeacherGroups = [];
    debugLog(member_of_groups);
    globalBus().saver.userOrg = [];
    globalBus().saver.userTeacherOrg = [];
    let group_len = globalBus().saver.userGroups.length;

    for (let i = 0; i < group_len; i++) {
        if (globalBus().saver.userGroups[i].role === "teacher") {
            debugLog("@@@@@@@@___________teacher");
            debugLog(globalBus().saver.userGroups[i]);
            globalBus().saver.userTeacherGroups.push(globalBus().saver.userGroups[i].group);
            debugLog(globalBus().saver.userTeacherGroups);
        }
        debugLog(">>>>>>>>>>>>>>");
        debugLog(globalBus().saver.userGroups[i].group.organization);
        let orgIdInArr = false;
        let org_len =  globalBus().saver.userOrg.length;
        for (let j = 0; j < org_len; j++) {
            if (globalBus().saver.userOrg[j].id === globalBus().saver.userGroups[i].group.organization.id) {
                orgIdInArr = true;
            }
        }
        if (!orgIdInArr) {
            globalBus().saver.userOrg.push(
                globalBus().saver.userGroups[i].group.organization
            );
            if (globalBus().saver.userGroups[i].role === "teacher") {
                globalBus().saver.userTeacherOrg.push(
                    globalBus().saver.userGroups[i].group.organization
                )
            }
        }
    }
    debugLog("__________________ORG =");
    debugLog(globalBus().saver.userOrg);
    debugLog("__________________TEACHER ORG =");
    debugLog(globalBus().saver.userTeacherOrg);
    debugLog("__________________GROUP =");
    debugLog(globalBus().saver.userGroups);
    debugLog("__________________TEACHER GROUP =");
    debugLog(globalBus().saver.userTeacherGroups);
}