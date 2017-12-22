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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class DemandListApprove extends BaseUpdate {
    private static final String DATASET_ID = "DemandListApprove";
    private final static String PARAM_ACTION = "op";

    @Override
    public UpdateReturnBean saveOrUpdate(MultiUpdateResultBean arg0, HttpServletRequest arg1, HttpServletResponse arg2) throws AppException {

        // 返回对象
        UpdateReturnBean updateReturnBean = new UpdateReturnBean();

        // 返回结果对象
        UpdateResultBean updateResultBean = multiUpdateResultBean.getUpdateResultBeanByID(DATASET_ID);
        String approve = updateResultBean.getParameter(PARAM_ACTION);
        approve = (null == approve || "" == approve) ? "" : approve;

        List<NsDemandList> beans = new ArrayList<NsDemandList>();
        while (updateResultBean.hasNext()) {
            NsDemandList bean = new NsDemandList();
            Map map = updateResultBean.next();
            String id = (String) map.get("id");
            String blacklistID = (String) map.get("demand_list_no");
            bean.setId(id);
            bean.setId(blacklistID);
            beans.add(bean);
        }
        OperationContext oc = new OperationContext();

        oc.setAttribute(DemandListOperation.CMD, DemandListOperation.CMD_APPROVE);
        oc.setAttribute(DemandListOperation.IN_APPROVE, approve);
        oc.setAttribute(DemandListOperation.IN_DEMAND_LISTS, beans);
        // call方式开启operation事务
        OPCaller.call(DemandListOperation.ID, oc);

        return updateReturnBean;

    }
}
