// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var microfrontends_v1_pb = require('./microfrontends_v1_pb.js');

function serialize_microfrontends_v1_MicrofrontendIdRequest(arg) {
  if (!(arg instanceof microfrontends_v1_pb.MicrofrontendIdRequest)) {
    throw new Error('Expected argument of type microfrontends_v1.MicrofrontendIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_microfrontends_v1_MicrofrontendIdRequest(buffer_arg) {
  return microfrontends_v1_pb.MicrofrontendIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_microfrontends_v1_MicrofrontendObjectReply(arg) {
  if (!(arg instanceof microfrontends_v1_pb.MicrofrontendObjectReply)) {
    throw new Error('Expected argument of type microfrontends_v1.MicrofrontendObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_microfrontends_v1_MicrofrontendObjectReply(buffer_arg) {
  return microfrontends_v1_pb.MicrofrontendObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_microfrontends_v1_MicrofrontendObjectRequest(arg) {
  if (!(arg instanceof microfrontends_v1_pb.MicrofrontendObjectRequest)) {
    throw new Error('Expected argument of type microfrontends_v1.MicrofrontendObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_microfrontends_v1_MicrofrontendObjectRequest(buffer_arg) {
  return microfrontends_v1_pb.MicrofrontendObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_microfrontends_v1_MicrofrontendPageReply(arg) {
  if (!(arg instanceof microfrontends_v1_pb.MicrofrontendPageReply)) {
    throw new Error('Expected argument of type microfrontends_v1.MicrofrontendPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_microfrontends_v1_MicrofrontendPageReply(buffer_arg) {
  return microfrontends_v1_pb.MicrofrontendPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_microfrontends_v1_MicrofrontendPageRequest(arg) {
  if (!(arg instanceof microfrontends_v1_pb.MicrofrontendPageRequest)) {
    throw new Error('Expected argument of type microfrontends_v1.MicrofrontendPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_microfrontends_v1_MicrofrontendPageRequest(buffer_arg) {
  return microfrontends_v1_pb.MicrofrontendPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The microfrontends service definition.
var MicrofrontendsService = exports.MicrofrontendsService = {
  get_microfrontends: {
    path: '/microfrontends_v1.Microfrontends/get_microfrontends',
    requestStream: false,
    responseStream: false,
    requestType: microfrontends_v1_pb.MicrofrontendPageRequest,
    responseType: microfrontends_v1_pb.MicrofrontendPageReply,
    requestSerialize: serialize_microfrontends_v1_MicrofrontendPageRequest,
    requestDeserialize: deserialize_microfrontends_v1_MicrofrontendPageRequest,
    responseSerialize: serialize_microfrontends_v1_MicrofrontendPageReply,
    responseDeserialize: deserialize_microfrontends_v1_MicrofrontendPageReply,
  },
  get_microfrontend_by_id: {
    path: '/microfrontends_v1.Microfrontends/get_microfrontend_by_id',
    requestStream: false,
    responseStream: false,
    requestType: microfrontends_v1_pb.MicrofrontendIdRequest,
    responseType: microfrontends_v1_pb.MicrofrontendObjectReply,
    requestSerialize: serialize_microfrontends_v1_MicrofrontendIdRequest,
    requestDeserialize: deserialize_microfrontends_v1_MicrofrontendIdRequest,
    responseSerialize: serialize_microfrontends_v1_MicrofrontendObjectReply,
    responseDeserialize: deserialize_microfrontends_v1_MicrofrontendObjectReply,
  },
  create_microfrontend: {
    path: '/microfrontends_v1.Microfrontends/create_microfrontend',
    requestStream: false,
    responseStream: false,
    requestType: microfrontends_v1_pb.MicrofrontendObjectRequest,
    responseType: microfrontends_v1_pb.MicrofrontendObjectReply,
    requestSerialize: serialize_microfrontends_v1_MicrofrontendObjectRequest,
    requestDeserialize: deserialize_microfrontends_v1_MicrofrontendObjectRequest,
    responseSerialize: serialize_microfrontends_v1_MicrofrontendObjectReply,
    responseDeserialize: deserialize_microfrontends_v1_MicrofrontendObjectReply,
  },
  update_microfrontend: {
    path: '/microfrontends_v1.Microfrontends/update_microfrontend',
    requestStream: false,
    responseStream: false,
    requestType: microfrontends_v1_pb.MicrofrontendObjectRequest,
    responseType: microfrontends_v1_pb.MicrofrontendObjectReply,
    requestSerialize: serialize_microfrontends_v1_MicrofrontendObjectRequest,
    requestDeserialize: deserialize_microfrontends_v1_MicrofrontendObjectRequest,
    responseSerialize: serialize_microfrontends_v1_MicrofrontendObjectReply,
    responseDeserialize: deserialize_microfrontends_v1_MicrofrontendObjectReply,
  },
  delete_microfrontend_by_id: {
    path: '/microfrontends_v1.Microfrontends/delete_microfrontend_by_id',
    requestStream: false,
    responseStream: false,
    requestType: microfrontends_v1_pb.MicrofrontendIdRequest,
    responseType: microfrontends_v1_pb.MicrofrontendObjectReply,
    requestSerialize: serialize_microfrontends_v1_MicrofrontendIdRequest,
    requestDeserialize: deserialize_microfrontends_v1_MicrofrontendIdRequest,
    responseSerialize: serialize_microfrontends_v1_MicrofrontendObjectReply,
    responseDeserialize: deserialize_microfrontends_v1_MicrofrontendObjectReply,
  },
};

exports.MicrofrontendsClient = grpc.makeGenericClientConstructor(MicrofrontendsService);
