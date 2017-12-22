package com.cibfintech.blacklist.bankblacklist.updater;

import com.cibfintech.blacklist.operation.DemandListOperation;
import com.huateng.common.err.Module;
import com.huateng.common.err.Rescode;
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

public class DemandListDEL extends BaseUpdate {
    private static final String DATASET_ID = "DemandListEdit";
    private static final String PARAM_ACTION = "op";

    @Override
    public UpdateReturnBean saveOrUpdate(MultiUpdateResultBean multiUpdateResultBean, HttpServletRequest request, HttpServletResponse response)
            throws AppException {
        try {
            // 返回对象
            UpdateReturnBean updateReturnBean = new UpdateReturnBean();
            // 结果集对象
            UpdateResultBean updateResultBean = multiUpdateResultBean.getUpdateResultBeanByID(DATASET_ID);
            String del = updateResultBean.getParameter(PARAM_ACTION);
            del = (null == del || "" == del) ? "" : del;
            // 更新对象
            List<NsDemandList> beans = new ArrayList<NsDemandList>();
            while (updateResultBean.hasNext()) {
                NsDemandList bean = new NsDemandList();
                Map map = updateResultBean.next();
                String id = (String) map.get("id");
                bean.setId(id);
                beans.add(bean);
            }

            OperationContext oc = new OperationContext();
            oc.setAttribute(DemandListOperation.CMD, DemandListOperation.CMD_DEL);
            oc.setAttribute(DemandListOperation.IN_DEL, del);
            oc.setAttribute(DemandListOperation.IN_DEMAND_LISTS, beans);

            // call方式开启operation事务
            OPCaller.call(DemandListOperation.ID, oc);
            return updateReturnBean;
        } catch (AppException appe) {
            throw appe;
        } catch (Exception e) {
            throw new AppException(Module.SYSTEM_MODULE, Rescode.DEFAULT_RESCODE, e.getMessage(), e);
        }
    }
}
