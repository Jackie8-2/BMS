package com.cibfintech.blacklist.bankblacklist.updater;

import com.cibfintech.blacklist.operation.DemandListOperation;
import com.huateng.commquery.result.MultiUpdateResultBean;
import com.huateng.commquery.result.UpdateResultBean;
import com.huateng.commquery.result.UpdateReturnBean;
import com.huateng.ebank.framework.operation.OPCaller;
import com.huateng.ebank.framework.operation.OperationContext;
import com.huateng.ebank.framework.web.commQuery.BaseUpdate;
import com.huateng.exception.AppException;
import resource.bean.blacklist.NsDemandList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class DemandListUpdate extends BaseUpdate {
    private static final String DATASET_ID = "DemandListManage";
    private final static String PARAM_ACTION = "op";
    private final static String PARAM_ACTION_SAVE = "opSave";

    @Override
    public UpdateReturnBean saveOrUpdate(MultiUpdateResultBean arg0, HttpServletRequest arg1, HttpServletResponse arg2) throws AppException {

        // 返回对象
        UpdateReturnBean updateReturnBean = new UpdateReturnBean();

        // 返回结果对象
        UpdateResultBean updateResultBean = multiUpdateResultBean.getUpdateResultBeanByID(DATASET_ID);

        // 返回黑名单对象
        NsDemandList bankblacklist = new NsDemandList();

        OperationContext oc = new OperationContext();
        if (updateResultBean.hasNext()) {
            // 属性拷贝
            Map map = updateResultBean.next();
            BaseUpdate.mapToObject(bankblacklist, map);
            String op = updateResultBean.getParameter(PARAM_ACTION);
            String opSave = updateResultBean.getParameter(PARAM_ACTION_SAVE);
            op = (null == op || "" == op) ? "" : op;
            opSave = (null == opSave || "" == opSave) ? "" : opSave;

            if (op.equals(DemandListOperation.IN_EDIT)) {
                oc.setAttribute(DemandListOperation.CMD, DemandListOperation.CMD_EDIT);
            }
            if (op.equals(DemandListOperation.IN_ADD)) {
                oc.setAttribute(DemandListOperation.CMD, DemandListOperation.CMD_ADD);
            }
            oc.setAttribute(DemandListOperation.IN_PARAM, op);
            oc.setAttribute(DemandListOperation.IN_PARAM_SAVE, opSave);
            oc.setAttribute(DemandListOperation.IN_DEMAND_LIST, bankblacklist);
            // call方式开启operation事务
            OPCaller.call(DemandListOperation.ID, oc);
            return updateReturnBean;
        }

        return null;
    }

}
