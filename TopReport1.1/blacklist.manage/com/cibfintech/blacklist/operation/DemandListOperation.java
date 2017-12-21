package com.cibfintech.blacklist.operation;


import com.cibfintech.blacklist.bankblacklist.service.DemandListApproveStateService;
import com.cibfintech.blacklist.bankblacklist.service.DemandListService;
import com.cibfintech.blacklist.util.GenerateID;
import com.cibfintech.view.pub.DemandListApproveStateView;
import com.huateng.ebank.business.common.GlobalInfo;
import com.huateng.ebank.business.common.SystemConstant;
import com.huateng.ebank.framework.exceptions.CommonException;
import com.huateng.ebank.framework.operation.BaseOperation;
import com.huateng.ebank.framework.operation.OperationContext;
import com.huateng.ebank.framework.util.DateUtil;
import com.huateng.report.utils.ReportEnum;
import com.huateng.report.utils.ReportTaskUtil;
import resource.bean.blacklist.NsDemandList;
import resource.bean.blacklist.NsDemandListApproveState;
import resource.bean.report.SysTaskInfo;

import java.io.IOException;
import java.util.List;

public class DemandListOperation extends BaseOperation {
        public static final String ID = "DemandListOperation";
        public static final String CMD = "CMD";
        public static final String IN_DEMAND_LIST = "IN_DEMAND_LIST";
        public static final String IN_DEMAND_LISTS = "IN_DEMAND_LISTS";
        public static final String IN_PARAM = "IN_PARAM";
        public static final String IN_PARAM_SAVE = "IN_PARAM_SAVE";
        public static final String IN_DEL = "del";
        public static final String IN_ADD = "add";
        public static final String IN_EDIT = "edit";
        public static final String IN_APPROVE = "approve";
        public final static String CMD_ADD = "CMD_ADD";
        public final static String CMD_DEL = "CMD_DEL";
        public final static String CMD_EDIT = "CMD_edit";
        public final static String CMD_APPROVE = "CMD_approve";

        @Override
        public void beforeProc(OperationContext context) throws CommonException {

        }

        @Override
        public void execute(OperationContext context) throws CommonException {
            String cmd = (String) context.getAttribute(CMD);
            DemandListService service = DemandListService.getInstance();
            DemandListApproveStateService auditStateService = DemandListApproveStateService.getInstance();
            GlobalInfo globalInfo = GlobalInfo.getCurrentInstance();

            if (CMD_DEL.equals(cmd)) {
                // 删除
                List<DemandListApproveStateView> fromBeans = (List<DemandListApproveStateView>) context.getAttribute(IN_DEMAND_LISTS);
                String del = (String) context.getAttribute(IN_DEL);
                for (DemandListApproveStateView auditStateView : fromBeans) {
                    if (del.equals("deleteT")) {
                        NsDemandListApproveState auditState = new NsDemandListApproveState();
                        auditState.setId(String.valueOf(GenerateID.getId()));
                        auditState.setDemand_list_no(auditStateView.getDemand_list_no());
                        auditState.setBrcode(globalInfo.getBrcode());
                        auditState.setId(globalInfo.getTlrno());
                        auditStateService.modOrAddEntity(auditState);
                    }

                    NsDemandList bean = service.selectById(auditStateView.getDemand_list_no());
                    bean.setStatus_cd(SystemConstant.FALSE);
                    service.modEntity(bean);
                }
            } else if (CMD_ADD.equals(cmd)) {
                // 插入或者更新
                NsDemandList fromBean = (NsDemandList) context.getAttribute(IN_DEMAND_LIST);
                String param = (String) context.getAttribute(IN_PARAM_SAVE);
                String blacklistID = fromBean.getStatus_cd();

                fromBean.setId(blacklistID);
                fromBean.setStatus_cd("0");
                service.addEntity(fromBean);
            } else if (CMD_APPROVE.equals(cmd)) {
                // 审批
                List<DemandListApproveStateView> fromBeans = (List<DemandListApproveStateView>) context.getAttribute(IN_DEMAND_LISTS);
                String approve = (String) context.getAttribute(IN_APPROVE);

                for (DemandListApproveStateView auditStateView : fromBeans) {
                    NsDemandListApproveState auditState = auditStateService.selectById(auditStateView.getId());
                    if (approve.equals("approveT")) {
                        auditState.setApprove_state(ReportEnum.BANK_BLACKLIST_AUDIT_STATE.APED.value);
                    } else if (approve.equals("approveF")) {
                        auditState.setApprove_state(ReportEnum.BANK_BLACKLIST_AUDIT_STATE.EDED.value);
                    }
                    auditState.setApprove_user_id(globalInfo.getTlrno());
                    auditState.setApprove_passday(DateUtil.getCurrentDateWithTime());
                    auditStateService.modEntity(auditState);

                    NsDemandList bean = service.selectById(auditStateView.getDemand_list_no());
                    bean.setStatus_cd("1");
                    service.modEntity(bean);
                }

            } else if (CMD_EDIT.equals(cmd)) {
                NsDemandList fromBean = (NsDemandList) context.getAttribute(IN_DEMAND_LIST);
                NsDemandList bean = service.selectById(fromBean.getId());
                String param = (String) context.getAttribute(IN_PARAM_SAVE);

                if (param.equals("queryVerify")) {
                    NsDemandListApproveState auditState = new NsDemandListApproveState();
                    // auditState.setId(String.valueOf(GenerateID.getId()));
                    auditState.setId(fromBean.getId());
                    auditState.setApprove_state(bean.getId());
                    auditState.setApprove_state(ReportEnum.BANK_BLACKLIST_AUDIT_STATE.EDED.value);
                    auditState.setBrcode(globalInfo.getBrcode());
                    auditState.setApprove_user_id(globalInfo.getTlrno());
                    auditState.setApprove_passday(DateUtil.getCurrentDateWithTime());
                    auditStateService.modOrAddEntity(auditState);
                }

                bean.setDev_confirm_day(fromBean.getDev_confirm_day());
                bean.setRel_system_name(fromBean.getRel_system_name());
                bean.setHourly_wage(fromBean.getHourly_wage());
                bean.setStatus_cd("0");
                service.modEntity(bean);
            }
        }

        @Override
        public void afterProc(OperationContext context) throws CommonException {
            // TODO Auto-generated method stub
        }
    }

