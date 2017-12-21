package resource.bean.blacklist.base;

import java.io.Serializable;
import java.util.Date;

import resource.bean.blacklist.NsDemandListApproveState;

public class BaseNsDemandListApproveState implements Serializable {
    private String id;
    private String demand_list_no;
    private String brcode;
    private String approve_state;
    private Date approve_passday;
    private String approve_user_id;

    public String getApprove_user_id() {
        return approve_user_id;
    }

    public void setApprove_user_id(String approve_user_id) {
        this.approve_user_id = approve_user_id;
    }

    private int hashCode = Integer.MIN_VALUE;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDemand_list_no() {
        return demand_list_no;
    }

    public void setDemand_list_no(String demand_list_no) {
        this.demand_list_no = demand_list_no;
    }

    public String getBrcode() {
        return brcode;
    }

    public void setBrcode(String brcode) {
        this.brcode = brcode;
    }

    public String getApprove_state() {
        return approve_state;
    }

    public void setApprove_state(String approve_state) {
        this.approve_state = approve_state;
    }

    public Date getApprove_passday() {
        return approve_passday;
    }

    public void setApprove_passday(Date approve_passday) {
        this.approve_passday = approve_passday;
    }
    public  BaseNsDemandListApproveState(){
        initialize();
    }
    public BaseNsDemandListApproveState(String id){
        this.id=id;
        initialize();
    }
    protected void initialize() {
    }
    public boolean equals(Object obj) {
        if (null == obj)
            return false;
        if (!(obj instanceof NsDemandListApproveState))
            return false;
        else {
            NsDemandListApproveState intenaBLOperateLog = (NsDemandListApproveState) obj;
            if (null == this.getId() || null == intenaBLOperateLog.getId())
                return false;
            else
                return (this.getId().equals(intenaBLOperateLog.getId()));
        }
    }

    public int hashCode() {
        if (Integer.MIN_VALUE == this.hashCode) {
            if (null == this.getId())
                return super.hashCode();
            else {
                String hashStr = this.getClass().getName() + ":" + this.getId().hashCode();
                this.hashCode = hashStr.hashCode();
            }
        }
        return this.hashCode;
    }
}
