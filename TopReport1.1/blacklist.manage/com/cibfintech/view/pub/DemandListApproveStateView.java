package com.cibfintech.view.pub;

import java.util.Date;

public class DemandListApproveStateView {
    private String id;
    private String demand_list_no;
    private String approve_user_id;
    private String brcode;
    private String approve_state;
    private Date approve_passday;
    private String bank_name;
    private String rel_system_name;
    private String confirm_no;
    private boolean selected;

    public String getBank_name() {
        return bank_name;
    }

    public void setBank_name(String bank_name) {
        this.bank_name = bank_name;
    }

    public String getRel_system_name() {
        return rel_system_name;
    }

    public void setRel_system_name(String rel_system_name) {
        this.rel_system_name = rel_system_name;
    }

    public String getConfirm_no() {
        return confirm_no;
    }

    public void setConfirm_no(String confirm_no) {
        this.confirm_no = confirm_no;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
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

    public String getApprove_user_id() {
        return approve_user_id;
    }

    public void setApprove_user_id(String approve_user_id) {
        this.approve_user_id = approve_user_id;
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
}
