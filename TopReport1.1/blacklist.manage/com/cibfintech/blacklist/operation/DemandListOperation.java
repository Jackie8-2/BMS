package com.cibfintech.blacklist.operation;


import com.cibfintech.blacklist.bankblacklist.service.DemandListService;
import com.huateng.ebank.framework.exceptions.CommonException;
import com.huateng.ebank.framework.operation.BaseOperation;
import com.huateng.ebank.framework.operation.OperationContext;
import resource.bean.blacklist.NsDemandList;

import java.util.ArrayList;
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

            if (CMD_DEL.equals(cmd)) {
                // 删除
                List<NsDemandList> fromBean = (List<NsDemandList>) context.getAttribute(IN_DEMAND_LISTS);
                for(NsDemandList nsDemandList : fromBean){
                    NsDemandList bean = service.selectById(nsDemandList.getId());
                    bean.setIs_del("1");
                    service.modEntity(bean);
                }

            } else if (CMD_ADD.equals(cmd)) {
                // 插入或者更新
                resource.bean.blacklist.NsDemandList fromBean = (resource.bean.blacklist.NsDemandList) context.getAttribute(IN_DEMAND_LIST);
                fromBean.setStatus_cd("0");
                service.addEntity(fromBean);
            } else if (CMD_APPROVE.equals(cmd)) {
                // 审批
                List<NsDemandList> fromBeans = (List<NsDemandList>) context.getAttribute(IN_DEMAND_LISTS);

                for (NsDemandList auditStateView : fromBeans) {

                    resource.bean.blacklist.NsDemandList bean = service.selectById(auditStateView.getId());
                    bean.setStatus_cd("1");
                    service.modEntity(bean);
                }

            } else if (CMD_EDIT.equals(cmd)) {
                resource.bean.blacklist.NsDemandList fromBean = (resource.bean.blacklist.NsDemandList) context.getAttribute(IN_DEMAND_LIST);
                resource.bean.blacklist.NsDemandList bean = service.selectById(fromBean.getId());
                bean.setCustomer_manager(fromBean.getCustomer_manager());
                bean.setBank_id(fromBean.getBank_id());
                bean.setBank_name(fromBean.getBank_name());
                bean.setBank_start(fromBean.getBank_start());
                bean.setBank_type(fromBean.getBank_type());
                bean.setHourly_wage(fromBean.getHourly_wage());
                bean.setDev_name(fromBean.getDev_name());
                bean.setRel_system_name(fromBean.getRel_system_name());
                bean.setDev_day(fromBean.getDev_day());
                bean.setDev_confirm_day(fromBean.getDev_confirm_day());
                bean.setDev_quote_day(fromBean.getDev_quote_day());
                bean.setRemarks(fromBean.getRemarks());
                bean.setConfirm_no(fromBean.getConfirm_no());
                bean.setCop_bank_principal(fromBean.getCop_bank_principal());
                bean.setCop_bank_principal_phone(fromBean.getCop_bank_principal_phone());
                bean.setDemand_theme(fromBean.getDemand_theme());
                bean.setStatus_cd("0");
                service.modEntity(bean);
            }
        }

        @Override
        public void afterProc(OperationContext context) throws CommonException {
            // TODO Auto-generated method stub
        }
    }

