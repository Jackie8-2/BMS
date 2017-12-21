package com.cibfintech.cloud.server;

import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.keepalive.KeepAliveMessageFactory;

/*
 * @see 发送心跳包的内容
 * getResponse()---->isResponse();获取数据判断心跳事件（目的是判断是否触发心跳超时异常）
 * isRequest()----->getRequest(); 写回数据是心跳事件触发的数据（目的写回给服务器（客户端）心跳包）
 * @author yyxyz
 */
public class KeepAliveMessageFactoryImpl implements KeepAliveMessageFactory {

	// 心跳包内容
	private static final String HEARTBEATREQUEST = "HEARTBEATREQUEST";
	private static final String HEARTBEATRESPONSE = "HEARTBEATRESPONSE";

	/*
	 * @see 返回给客户端的心跳包数据 return 返回结果才是客户端收到的心跳包数据
	 * 
	 * @author Herman.Xiong
	 */
	public Object getRequest(IoSession session) {
		return HEARTBEATREQUEST;
	}

	/*
	 * @see 接受到的客户端数据包
	 * 
	 * @author Herman.Xiong
	 */
	public Object getResponse(IoSession session, Object request) {
		return request;
	}

	/*
	 * @see 判断是否是客户端发送来的的心跳包此判断影响 KeepAliveRequestTimeoutHandler实现类判断是否心跳包发送超时
	 * 
	 * @author Herman.Xiong
	 */
	public boolean isRequest(IoSession session, Object message) {
		if (message.equals(HEARTBEATRESPONSE)) {
			System.out.println("接收到客户端心数据包引发心跳事件-----心跳数据包是》》" + message);
			return true;
		}
		return false;
	}

	/*
	 * @see 判断发送信息是否是心跳数据包此判断影响 KeepAliveRequestTimeoutHandler实现类 判断是否心跳包发送超时
	 * 
	 * @author Herman.Xiong
	 */
	public boolean isResponse(IoSession session, Object message) {
		if (message.equals(HEARTBEATREQUEST)) {
			System.out.println("服务器发送数据包中引发心跳事件: " + message);
			return true;
		}
		return false;
	}
}